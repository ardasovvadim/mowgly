using System;
using System.Collections.Generic;
using WebApi.Entities.Interfaces;

namespace WebApi.Entities
{
    public class Location : IBaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Deleted { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }

        public virtual ICollection<UserRequest> UserRequests { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
    }
}