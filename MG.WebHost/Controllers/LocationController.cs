using MG.WebHost.Config;
using MG.WebHost.Entities;
using MG.WebHost.Models;
using MG.WebHost.Models.Locations;
using MG.WebHost.Services;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers
{
    public class LocationController : BaseController
    {
        private readonly ILocationService _locationService;
        
        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IEnumerable<LocationVm>> GetAsync()
        {
            return await BaseService.GetAllAsync<LocationVm, Location>();
        }

        #region Admin

        [HttpPost("list"), Authorize(MgPermissions.Location.Get)]
        public async Task<Page<AdminLocationVm>> GetListAsync(GetAdminLocationVmRequest request)
        {
            return await BaseService.GetListAsync<AdminLocationVm, Location>(request, query =>
            {
                return query
                    .WhereIf(request.FilterCity.IsNotNullOrEmpty(), l => l.City.ToUpper() == request.FilterCity.ToUpper())
                    .WhereIf(request.FilterText.IsNotNullOrEmpty(), l => l.Name.Contains(request.FilterText))
                    ;
            });
        }

        [HttpGet("{id}"), Authorize(MgPermissions.Location.Get)]
        public async Task<LocationEditModel> GetByIdAsync(Guid id)
        {
            return await BaseService.GetByIdAsync<LocationEditModel, Location>(id, nameof(Location.Sections));
        }
        
        [HttpPost, Authorize(MgPermissions.Location.Create)]
        public async Task<LocationEditModel> Save(LocationEditModel model)
        {
            return await _locationService.Save(model);
        }

        [HttpDelete("{locationId:guid}"), Authorize(MgPermissions.Location.Delete)]
        public async Task Delete(Guid locationId)
        { 
            await BaseService.DeleteAsync<Location>(locationId);
        }

        #endregion
    }
}