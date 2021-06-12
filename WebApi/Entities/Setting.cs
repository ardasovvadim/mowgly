using System;
using WebApi.Entities.Interfaces;

namespace WebApi.Entities
{
    public class Setting : IBaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Deleted { get; set; }
        // ------------------
        public string Name { get; set; }
        public string Value { get; set; }
    }
}