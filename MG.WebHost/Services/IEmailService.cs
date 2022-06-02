using System.Collections.Generic;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Emails;
using MG.WebHost.Entities.Users;
using MG.WebHost.Repositories;
using MG.WebHost.Settings;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace MG.WebHost.Services
{
    public interface IEmailService : IEmailSender
    {
        Task SendEmailAsync(EmailTemplateKey emailTemplateKey, string title, User recipient, IDictionary<string, object> objects);
    }

    public class EmailService : BaseService, IEmailService
    {
        private readonly IRepository<EmailTemplate> _emailRepository;
        private readonly IRepository<EmailQueue> _queueRepository;
        private readonly IEmailUtils _emailUtils;
        private readonly SmtpSettings _smtpSettings;

        public EmailService(IRepository<EmailTemplate> emailRepository, 
            IRepository<EmailQueue> queueRepository, 
            IEmailUtils emailUtils,
            IOptions<SmtpSettings> smtpSettings,
            IServiceProvider serviceProvider) : base(serviceProvider)
        {
            _emailRepository = emailRepository;
            _queueRepository = queueRepository;
            _emailUtils = emailUtils;
            _smtpSettings = smtpSettings.Value;
        }

        public async Task SendEmailAsync(EmailTemplateKey emailTemplateKey, string title, User recipient, IDictionary<string, object> objects)
        {
            var emailTemplate = await _emailRepository.GetQueryable().FirstOrDefaultAsync(e => e.Name == emailTemplateKey.ToString());
            
            if (emailTemplate == null)
                return;

            var body = _emailUtils.GenerateEmailBody(emailTemplate.Value, objects);
            var newEmail = new EmailQueue
            {
                Body = body,
                Subject = title,
                ToRecipients = recipient.Email,
                State = EmailState.Pending
            };
            
            await _queueRepository.InsertAsync(newEmail);
            await _queueRepository.SaveChangesAsync();
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            try
            {
                var mimeEmail = new MimeMessage
                {
                    Subject = subject,
                    Body = new TextPart(TextFormat.Html) { Text = htmlMessage },
                    Sender = MailboxAddress.Parse(_smtpSettings.Login)
                };

                SetRecipients(new [] { email }, mimeEmail.To);
            
                var smtpClient = new SmtpClient();
                await smtpClient.ConnectAsync(_smtpSettings.Server, _smtpSettings.Port, SecureSocketOptions.Auto);
                await smtpClient.AuthenticateAsync(_smtpSettings.Login, _smtpSettings.Password);

                await smtpClient.SendAsync(mimeEmail);
            }
            catch (Exception e)
            {
                Logger.LogError(e, "Exception during sending email");
            }
        }

        private void SetRecipients(IEnumerable<string> toRecipients, InternetAddressList emailRecipients)
        {
            if (!(toRecipients?.Any() ?? false)) 
                return;
            
            foreach (var recipient in toRecipients)
                if (MailboxAddress.TryParse(recipient, out var emailAddress))
                    emailRecipients.Add(emailAddress);
        }
    }
}