using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Emails
{
    public class EmailTemplate : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}