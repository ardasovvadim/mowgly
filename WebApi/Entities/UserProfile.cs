using System;
using WebApi.Entities.Interfaces;

namespace WebApi.Entities
{
    public class UserProfile : IBaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Deleted { get; set; }
        
        public virtual User User { get; set; }
        public int UserId { get; set; }
    }
}