using System;
using WebApi.Entities.Interfaces;

namespace WebApi.Entities
{
    public class TimetableRecord : IBaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Deleted { get; set; }

        public virtual Section Section { get; set; }
        public int SectionId { get; set; }

        public virtual User Master { get; set; }
        public int MasterId { get; set; }

        public DayOfWeek DayOfWeek { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}