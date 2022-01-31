using System;

namespace MG.WebApi.Models.TimetableRecords;

public class TimetableRecordEditModel
{
    public Guid? Id { get; set; }
    public Guid SectionId { get; set; }
    public Guid LocationId { get; set; }
    public Guid MasterId { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public string Time { get; set; }
}