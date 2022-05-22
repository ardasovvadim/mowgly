namespace MG.WebHost.Models.TimetableRecords
{
    public record TimeTableRecordCriteriaRequest
    {
        public Guid? SectionId { get; set; }
        public Guid? MasterId { get; set; }
        public Guid? LocationId { get; set; }
        public string City { get; set; }
        public string FilterText { get; set; }
    }
}