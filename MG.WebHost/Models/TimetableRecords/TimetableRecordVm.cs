namespace MG.WebHost.Models.TimetableRecords
{
    public record TimetableRecordLocationGroupVm
    {
        public string City { get; set; }
        public Guid LocationId { get; set; }
        public string LocationName { get; set; }
        public Guid SectionId { get; set; }
        public string SectionName { get; set; }
        public int? Group { get; set; }
        public IEnumerable<TimetableRecordMasterGroupVm> Masters { get; set; }
    }

    public record TimetableRecordMasterGroupVm
    {
        public Guid MasterId { get; set; }
        public string MasterName { get; set; }
        public IEnumerable<TimetableRecordVm> Timetables { get; set; }
    }
    
    public record TimetableRecordVm
    {
        public Guid Id { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}