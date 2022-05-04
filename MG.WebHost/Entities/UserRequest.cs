using System;
using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities
{
    public class UserRequest : BaseEntity
    {
        public virtual Location Location { get; set; }
        public Guid LocationId { get; set; }
    }
}