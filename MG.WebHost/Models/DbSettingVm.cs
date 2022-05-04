using System.Collections.Generic;

namespace MG.WebHost.Models
{
    public class DbSettingVm
    {
        public IEnumerable<PhoneNumber> PhoneNumbers { get; set; }
        public IEnumerable<EmailAddress> EmailAddresses { get; set; }
        public IEnumerable<LinkAddress> LinkAddresses { get; set; }
        public string UserName { get; set; }
    }

    public class PhoneNumber
    {
        public string Number { get; set; }
        public string Name { get; set; }
    }

    public class EmailAddress
    {
        public string Email { get; set; }
        public string Name { get; set; }
    }

    public class LinkAddress
    {
        public string Link { get; set; }
        public string Name { get; set; }
    }
}