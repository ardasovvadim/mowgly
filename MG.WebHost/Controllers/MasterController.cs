using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using MG.WebHost.Models.Masters;
using MG.WebHost.Services;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers
{
    public class MasterController : BaseController
    {
        private readonly IMasterService _masterService;
        private readonly IService<AdminMasterVm, User> _adminMasterService;

        public MasterController(IMasterService masterService, IService<AdminMasterVm, User> adminMasterService)
        {
            _masterService = masterService;
            _adminMasterService = adminMasterService;
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

        [HttpPost, Authorize]
        public async Task<Page<AdminMasterVm>> GetListAsync(GetMasterListRequest request)
        {
            return await _adminMasterService.GetListAsync(
                request,
                query =>
                {
                    var filterText = request.FilterText?.ToUpper().Trim();

                    return query
                        .Where(u => u.UserTypes.HasFlag(UserType.Master))
                        .WhereIf(!filterText.IsNullOrEmpty(), u => u.NormalizedName.Contains(filterText))
                        .WhereIf(request.SectionId != null, u => u.TimetableRecords.Any(s => s.SectionId == request.SectionId));
                }
                ,
                "TimetableRecords.Section");
        }

        [HttpGet("GetEditModel/{masterId:guid}"), Authorize]
        public async Task<IActionResult> GetEditModel(Guid masterId)
        {
            var master = await _masterService.GetMasterEditModel(masterId);

            if (master == null)
                return BadRequest();

            return Ok(master);
        }

        [HttpPost("SaveEditModel"), Authorize]
        public async Task<IActionResult> SaveEditModel(MasterEditModel model)
        {
            var master = await _masterService.SaveAsync(model);
            return Ok(master);
        }

        [HttpDelete("{id}"), Authorize]
        public async Task DeleteAsync(Guid id)
        {
            await _masterService.DeleteAsync(id);
        }

        #endregion
    }
}