using MG.WebHost.Config;
using MG.WebHost.Contracts.TimetableRecords;
using MG.WebHost.Contracts.Timetalbes;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers
{
    public class TimetableRecordController : BaseController
    {
        private readonly ITimetableRecordService _timetableRecordService;

        public TimetableRecordController(ITimetableRecordService timetableRecordService)
        {
            _timetableRecordService = timetableRecordService;
        }

        [HttpPost(nameof(GetTimeTableRecordsByCriteria))]
        public async Task<IEnumerable<TimetableRecordLocationGroupVm>> GetTimeTableRecordsByCriteria(TimeTableRecordCriteriaRequest criteria)
        {
            return await _timetableRecordService.GetTimeTableRecordsByCriteria(criteria);
        }

        [HttpPost(nameof(GetTimeTableRecordsAsync))]
        public async Task<GetTimetableRecordsResponse> GetTimeTableRecordsAsync(TimeTableRecordCriteriaRequest request)
        {
            return await _timetableRecordService.GetTimeTableRecordsAsync(request);
        }

        [HttpPost(nameof(AddTimetableRecordAsync)), Authorize(MgPermissions.TimetableRecord.Create)]
        public async Task<TimetableRecordEditModel> AddTimetableRecordAsync(TimetableRecordEditModel request)
        {
            return await _timetableRecordService.AddTimetableRecordAsync(request);
        }

        [HttpDelete("{id}"), Authorize(MgPermissions.TimetableRecord.Delete)]
        public async Task DeleteTimetableRecordAsync(Guid id)
        {
            await _timetableRecordService.DeleteAsync(id);
        }
    }
}