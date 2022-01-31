using MG.WebAPi.Entities.Interfaces;

namespace MG.WebApi.Entities.Emails
{
    public class EmailTemplate : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}