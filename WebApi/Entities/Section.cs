using System;
using System.Collections.Generic;
using WebApi.Entities.Interfaces;

namespace WebApi.Entities
{
    public class Section : IBaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Deleted { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        
        public virtual Location Location { get; set; }
        public int LocationId { get; set; }

        public virtual ICollection<User> Masters { get; set; }
    }
}