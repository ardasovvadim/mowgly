using MG.WebHost.Entities.Emails;
using MG.WebHost.Entities.Users;

namespace MG.WebHost.Contracts.Emails
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailTemplateKey emailTemplateKey, string title, User recipient, IDictionary<string, object> objects);
    }
}