using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Emails
{
    public class EmailQueue : BaseEntity
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public EmailState State { get; set; }
        public string ToRecipients { get; set; }
        public string CcRecipients { get; set; }
        public int Retries { get; set; }
    }
}