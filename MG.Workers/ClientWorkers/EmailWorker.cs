using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MG.WebApi.Entities.Emails;
using MG.WebAPi.Repositories;
using MG.Workers.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace MG.Workers.ClientWorkers
{
    public class EmailWorker : IScopedWorker
    {
        private readonly ILogger<EmailWorker> _logger;
        private readonly IRepository<EmailQueue> _repository;
        private readonly SmtpSettings _smtpSettings;

        public EmailWorker(ILogger<EmailWorker> logger, 
            IRepository<EmailQueue> repository, 
            IOptions<SmtpSettings> smtpSettings)
        {
            _logger = logger;
            _repository = repository;
            _smtpSettings = smtpSettings.Value;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Started at: {DateTime.UtcNow}");
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Stopped at: {DateTime.UtcNow}");
            return Task.CompletedTask;
        }

        public async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                var breakWorker = false;
                var pendingEmails = await GetQueueEmailsAsync(EmailState.Pending, stoppingToken);
                var isPendingEmails = pendingEmails?.Any() ?? false;
                
                if (isPendingEmails)
                {
                    _logger.LogInformation($"Pending emails were found: {pendingEmails.Count}");
                    breakWorker = await ProcessAndSendEmailsAsync(pendingEmails, stoppingToken);
                }

                var processProblemEmails = !breakWorker && !isPendingEmails;
                if (processProblemEmails)
                {
                    var problemEmails = await GetQueueEmailsAsync(EmailState.Problem, stoppingToken, true);

                    if (problemEmails?.Any() ?? false)
                    {
                        _logger.LogInformation($"Problem emails were found: {problemEmails.Count}");
                        breakWorker = await ProcessAndSendEmailsAsync(problemEmails, stoppingToken);
                    }
                }

                if (breakWorker)
                    break;

                await Task.Delay(_smtpSettings.Delay, stoppingToken);
            }
        }

        private Task<List<EmailQueue>> GetQueueEmailsAsync(EmailState emailState, CancellationToken cancellationToken, bool failterByRetries = false)
        {
            var query = _repository.GetQueryable().Where(e => e.State == emailState);

            if (failterByRetries)
                query = query.Where(e => e.Retries < _smtpSettings.EmailMaxRetries);

            return query.Take(_smtpSettings.ProcessingEmails).ToListAsync(cancellationToken);
        }

        private async Task<bool> ProcessAndSendEmailsAsync(List<EmailQueue> processingEmails, CancellationToken cancellationToken)
        {
            try
            {
                var problemEmails = 0;
                using var smtpClient = await GetSmtpClient(cancellationToken);
                        
                foreach (var pendingEmail in processingEmails)
                {
                    try
                    {
                        var emailMessage = PrepareEmailMessage(pendingEmail);
                        await smtpClient.SendAsync(emailMessage, cancellationToken);
                        pendingEmail.State = EmailState.Sent;
                    }
                    catch (Exception e)
                    {
                        var isNotMaxRetry = pendingEmail.Retries < _smtpSettings.EmailMaxRetries;
                        
                        _logger.LogError(e, $"Exception was thrown while processing email: \"{pendingEmail.Id}\", retry: {pendingEmail.Retries}.{(isNotMaxRetry ? " Message will be tried to resend." : string.Empty)}");
                        ++problemEmails;
                        
                        pendingEmail.State = EmailState.Problem;
                        if (isNotMaxRetry)
                            ++pendingEmail.Retries;
                    }
                }

                await smtpClient.DisconnectAsync(true, cancellationToken);
                await _repository.SaveChangesAsync();
                        
                _logger.LogInformation($"Emails were processed and sent. Successful: {processingEmails.Count - problemEmails}{(problemEmails == 0 ? string.Empty : $", problems: {problemEmails}")}");
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Worker has got an unexpected error");
                return true;
            }

            return false;
        }

        private MimeMessage PrepareEmailMessage(EmailQueue pendingEmail)
        {
            var email = new MimeMessage
            {
                Subject = pendingEmail.Subject,
                Body = new TextPart(TextFormat.Html) { Text = pendingEmail.Body },
                Sender = MailboxAddress.Parse(_smtpSettings.Login)
            };
            var toRecipients = pendingEmail.ToRecipients?.Split(",").Select(to => to.Trim());
            var ccRecipients = pendingEmail.CcRecipients?.Split(",").Select(cc => cc.Trim());

            SetRecipients(toRecipients, email.To);
            SetRecipients(ccRecipients, email.Cc);

            return email;
        }

        private async Task<SmtpClient> GetSmtpClient(CancellationToken cancellationToken)
        {
            var smtpClient = new SmtpClient();
            await smtpClient.ConnectAsync(_smtpSettings.Server, _smtpSettings.Port, true, cancellationToken);
            await smtpClient.AuthenticateAsync(_smtpSettings.Login, _smtpSettings.Password, cancellationToken);

            return smtpClient;
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