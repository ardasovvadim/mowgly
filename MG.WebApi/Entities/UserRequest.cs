using System;
using MG.WebAPi.Entities.Interfaces;

namespace MG.WebApi.Entities
{
    public class UserRequest : BaseEntity
    {
        public virtual Location Location { get; set; }
        public Guid LocationId { get; set; }
    }
}