namespace MG.WebHost.Models.TimetableRecords;

public class TimetableRecordEditModelResponse
{
    public IEnumerable<TimetableRecordEditModel> Data { get; set; }
    public IEnumerable<IdName> Masters { get; set; }
}