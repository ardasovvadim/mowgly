using System;
using WebApi.Entities.Interfaces;

namespace WebApi.Entities
{
    public class UserRequest : IBaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Deleted { get; set; }

        public virtual Location Location { get; set; }
        public int LocationId { get; set; }
        
        
    }
}