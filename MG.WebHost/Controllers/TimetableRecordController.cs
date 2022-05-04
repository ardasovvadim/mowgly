using System.Collections.Generic;
using System.Threading.Tasks;
using MG.WebHost.Controllers;
using MG.WebHost.Models.TimetableRecords;
using MG.WebHost.Services;
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

        [HttpPost(nameof(GetTimeTableRecordEditModels))]
        public async Task<TimetableRecordEditModelResponse> GetTimeTableRecordEditModels(TimeTableRecordCriteriaRequest request)
        {
            return await _timetableRecordService.GetTimeTableRecordEditModelAsync(request);
        }
        
        // public async Task<Timetable>
    }
}