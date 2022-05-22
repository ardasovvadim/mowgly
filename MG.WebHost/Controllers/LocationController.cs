using MG.WebHost.Entities;
using MG.WebHost.Models.Locations;
using MG.WebHost.Services;
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

        [HttpGet("{id}"), Authorize]
        public async Task<LocationEditModel> GetByIdAsync(Guid id)
        {
            return await BaseService.GetByIdAsync<LocationEditModel, Location>(id, nameof(Location.Sections));
        }
        
        [HttpPost, Authorize]
        public async Task<LocationEditModel> Save(LocationEditModel model)
        {
            return await _locationService.Save(model);
        }

        [HttpDelete("{locationId:guid}"), Authorize]
        public async Task Delete(Guid locationId)
        { 
            await BaseService.DeleteAsync<Location>(locationId);
        }

        #endregion
    }
}