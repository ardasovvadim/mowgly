using System;
using System.Collections.Generic;
using AutoMapper;
using WebApi.Entities.Enums;
using WebApi.Entities.Interfaces;

namespace WebApi.Entities
{
    public class User : IBaseEntity, ILoginModel
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Deleted { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string JwtToken { get; set; }
        public string PhoneNumber { get; set; }
        public UserType UserTypes { get; set; }
        public DateTime? BirthDate { get; set; }
        
        public virtual ICollection<UserProfile> Profiles { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
        public virtual ICollection<TimetableRecord> TimetableRecords { get; set; }
    }
}