using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Sections
{
    public class Section : BaseEntity
    {
        public string Name { get; set; }
        
        public virtual ICollection<SectionSetting> Settings { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<TimetableRecord> TimetableRecords { get; set; }
    }
}