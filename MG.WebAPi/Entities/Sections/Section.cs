using System.Collections.Generic;
using MG.WebAPi.Entities.Interfaces;

namespace MG.WebApi.Entities.Sections
{
    public class Section : BaseEntity
    {
        public string Name { get; set; }
        
        public virtual ICollection<SectionSetting> Settings { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<User> Masters { get; set; }
    }
}