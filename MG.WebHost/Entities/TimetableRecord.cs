using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Users;

namespace MG.WebHost.Entities
{
    public class TimetableRecord : BaseEntity
    {
        public virtual Location Location { get; set; }
        public Guid LocationId { get; set; }
        
        public virtual Section Section { get; set; }
        public Guid SectionId { get; set; }

        public virtual User Master { get; set; }
        public Guid MasterId { get; set; }

        public DayOfWeek DayOfWeek { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        public int? Group { get; set; }
    }
}