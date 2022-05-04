using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MG.WebHost.Controllers;
using MG.WebHost.Models;
using MG.WebHost.Models.Masters;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers
{
    public class MasterController : BaseController
    {
        private readonly IMasterService _masterService;

        public MasterController(IMasterService masterService)
        {
            _masterService = masterService;
        }

        [HttpPost(nameof(GetCardMastersBySearchCriteria))]
        public async Task<Page<MasterVm>> GetCardMastersBySearchCriteria(MasterSearchCriteriaRequest request)
        {
            return await _masterService.GetCardMastersBySearchCriteriaAsync(request);
        }

        [HttpGet("{masterId:guid}")]
        public async Task<IActionResult> Get(Guid masterId)
        {
            var master = await _masterService.GetMasterInfoAsync(masterId);
            
            if (master == null)
                return BadRequest();
            
            return Ok(master);
        }


        #region Admin_rights

        // TODO: admin operation
        [HttpGet("GetEditModel/{masterId:guid}")]
        public async Task<IActionResult> GetEditModel(Guid masterId)
        {
            var master = await _masterService.GetMasterEditModel(masterId);

            if (master == null)
                return BadRequest();

            return Ok(master);
        }

        [HttpPost("SaveEditModel")]
        public async Task<IActionResult> SaveEditModel(MasterEditModel model)
        {
            var master = await _masterService.SaveAsync(model);
            return Ok(master);
        }

        #endregion
    }
}