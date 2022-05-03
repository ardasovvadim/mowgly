using System;
using MG.WebAPi.Entities.Interfaces;
using MG.WebApi.Entities.Sections;
using MG.WebApi.Entities.Users;

namespace MG.WebApi.Entities
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
    }
}