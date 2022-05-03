using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MG.WebApi.Entities;
using MG.WebAPi.Models;
using MG.WebApi.Models.Locations;
using MG.WebAPi.Repositories;
using MG.WebAPi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MG.WebAPi.Controllers
{
    public class LocationController : BaseController
    {
        private readonly IService<LocationVm, Location> _locationService;

        public LocationController(IService<LocationVm, Location> locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IEnumerable<LocationVm>> GetAsync()
        {
            return await _locationService.GetAllAsync();
        }

        #region Admin

        [HttpPost]
        public async Task<IActionResult> Save(LocationVm model)
        {
            var dto = await _locationService.SaveAsync(model);
            if (dto == null)
                BadRequest();
            return Ok(dto);
        }

        [HttpDelete("{locationId:guid}")]
        public async Task<IActionResult> Delete(Guid locationId)
        {
            var result = await _locationService.DeleteAsync(locationId);
            if (!result)
                BadRequest();
            return Ok();
        }

        #endregion
    }
}