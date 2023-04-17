namespace MG.WebHost.Contracts.Emails;

public interface IEmailGenerator
{
    Task<string> GenerateEmailAsync(EmailType type, object model);
}