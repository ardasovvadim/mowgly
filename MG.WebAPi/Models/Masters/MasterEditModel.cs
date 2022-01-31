using System;
using System.Collections.Generic;

namespace MG.WebAPi.Models.Masters
{
    public record MasterEditModel
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public DateTime? Birthday { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public IEnumerable<GeneralSettingVm> Profiles { get; set; }
    }
}