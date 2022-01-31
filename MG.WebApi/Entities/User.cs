using System;
using System.Collections.Generic;
using MG.WebAPi.Entities.Enums;
using MG.WebAPi.Entities.Interfaces;
using MG.WebApi.Entities.Sections;
using MG.WebApi.Entities.Users;

namespace MG.WebApi.Entities
{
    public class User : LoginModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public UserType UserTypes { get; set; }
        public DateTime? Birthday { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<UserProfile> Profiles { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
        public virtual ICollection<TimetableRecord> TimetableRecords { get; set; }
    }
}