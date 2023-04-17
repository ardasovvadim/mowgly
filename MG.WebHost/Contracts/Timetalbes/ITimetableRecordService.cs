using MG.WebHost.Contracts.TimetableRecords;

namespace MG.WebHost.Contracts.Timetalbes
{
    public interface ITimetableRecordService
    {
        Task<IEnumerable<TimetableRecordLocationGroupVm>> GetTimeTableRecordsByCriteria(TimeTableRecordCriteriaRequest criteria);
        Task<GetTimetableRecordsResponse> GetTimeTableRecordsAsync(TimeTableRecordCriteriaRequest request);
        Task<TimetableRecordEditModel> AddTimetableRecordAsync(TimetableRecordEditModel request);
        Task DeleteAsync(Guid id);
    }
}