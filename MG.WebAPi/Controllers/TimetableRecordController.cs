using System.Collections.Generic;
using System.Threading.Tasks;
using MG.WebAPi.Controllers;
using MG.WebApi.Models.TimetableRecords;
using MG.WebAPi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebApi.Controllers
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