namespace MG.WebHost.Models.TimetableRecords;

public class GetTimetableRecordsResponse
{
    public IEnumerable<TimetableRecordEditModel> Data { get; set; }
    public IEnumerable<IdName> Masters { get; set; }
}