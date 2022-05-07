using MG.WebHost.Models.TimetableRecords;
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

        [HttpPost(nameof(GetTimeTableRecordEditModels)), Authorize]
        public async Task<TimetableRecordEditModelResponse> GetTimeTableRecordEditModels(TimeTableRecordCriteriaRequest request)
        {
            return await _timetableRecordService.GetTimeTableRecordEditModelAsync(request);
        }

        [HttpPost(nameof(AddTimetableRecordAsync)), Authorize]
        public async Task<TimetableRecordEditModel> AddTimetableRecordAsync(TimetableRecordEditModel request)
        {
            return null;
            
            return await _timetableRecordService.AddTimetableRecordAsync(request);
        }
    }
}