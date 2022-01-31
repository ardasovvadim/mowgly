using System.Collections.Generic;
using System.Threading.Tasks;
using MG.WebApi.Entities;
using MG.WebApi.Entities.Emails;
using MG.WebAPi.Repositories;
using MG.WebAPi.Utils;
using Microsoft.EntityFrameworkCore;

namespace MG.WebAPi.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailTemplateKey emailTemplateKey, string title, User recipient, IDictionary<string, object> objects);
    }

    public class EmailService : IEmailService
    {
        private readonly IRepository<EmailTemplate> _emailRepository;
        private readonly IRepository<EmailQueue> _queueRepository;
        private readonly IEmailUtils _emailUtils;
        
        public EmailService(IRepository<EmailTemplate> emailRepository, 
            IRepository<EmailQueue> queueRepository, 
            IEmailUtils emailUtils)
        {
            _emailRepository = emailRepository;
            _queueRepository = queueRepository;
            _emailUtils = emailUtils;
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
    }
}