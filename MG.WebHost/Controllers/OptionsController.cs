using System.ComponentModel.DataAnnotations;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Tournaments;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using MG.WebHost.Models.Options;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataType = System.ComponentModel.DataAnnotations.DataType;

namespace MG.WebHost.Controllers;

public class OptionsController : BaseController
{
    private readonly IRepository<Section> _sectionRepository;
    private readonly IRepository<Location> _locationRepository;
    private readonly IRepository<User> _userRepository;
    private readonly IRepository<Tournament> _tournamentRepository;

    public OptionsController(IRepository<Section> sectionRepository, 
        IRepository<Location> locationRepository, IRepository<User> userRepository, IRepository<Tournament> tournamentRepository)
    {
        _sectionRepository = sectionRepository;
        _locationRepository = locationRepository;
        _userRepository = userRepository;
        _tournamentRepository = tournamentRepository;
    }

    [HttpPost]
    public async Task<OptionsResponse> GetOptions(OptionsRequest request)
    {
        var result = new OptionsResponse();
// TODO refactor
        if (request.Cities)
            result.Cities = (await _locationRepository.GetQueryable().Select(l => l.City).Distinct().ToListAsync()).Where(c => !c.IsNullOrEmpty());

        if (request.Locations)
            result.Locations = await _locationRepository.GetQueryable().Select(l => new IdName { Id = l.Id, Name = l.Name }).ToListAsync();

        if (request.Sections)
            result.Sections = await _sectionRepository.GetQueryable().Select(s => new IdName { Id = s.Id, Name = s.Name }).ToListAsync();

        if (request.LocationSections)
            result.Locations2 = await _locationRepository
                .GetQueryable()
                .Select(l => new LocationOption
                {
                    Id = l.Id,
                    Name = l.Name,
                    Sections = l.Sections.Select(s => new IdName(s.Id, s.Name))
                })
                .ToListAsync();
        

        return result;
    }

    [HttpGet("master")]
    public async Task<IEnumerable<IdName>> GetMasterOptionsAsync(
        [FromQuery] string filterName
        )
    {
        return await _userRepository
            .GetQueryable()
            .WhereIf(filterName?.Trim().IsNullOrEmpty() == false, u => EF.Functions.Like(u.NormalizedName, $"%{filterName}%"))
            .Where(u => u.UserTypes.HasFlag(UserType.Master))
            .OrderBy(u => u.LastName)
            .Select(u => new IdName(u.Id, u.ConcatName()))
            .Take(5)
            .ToListAsync();
    }

    [HttpGet("location")]
    public async Task<IEnumerable<IdName>> GetLocationOptionsAsync()
    {
        return await _locationRepository
            .GetQueryable()
            .Select(l => new IdName(l.Id, l.Name))
            .ToListAsync();
    }

    [HttpGet("section")]
    public async Task<IEnumerable<IdName>> GetSectionOptionsAsync(
        [FromQuery] Guid? locationId,
        [FromQuery] string filterText,
        [FromQuery] string exceptLocationIds
        )
    {
        var exceptLocIds = exceptLocationIds?
            .Split(',')
            .Select(s => Guid.TryParse(s, out var id) ? id : (Guid?)null)
            .Where(s => s != null)
            .ToList();
        
        return await _sectionRepository
            .GetQueryable()
            .WhereIf(locationId != null, s => s.Locations.Any(l => l.Id == locationId))
            .WhereIf(filterText.IsNotNullOrEmpty(), s => s.Name.Contains(filterText.Trim()))
            .WhereIf(exceptLocIds?.Any() == true, s => !exceptLocIds.Contains(s.Id))
            .Select(s => new IdName(s.Id, s.Name))
            .ToListAsync();
    }

    [HttpGet("event")]
    public async Task<IEnumerable<IdName>> GetEventOptionsAsync(
        [FromQuery] string filterName,
        [FromQuery, DataType(DataType.Date)] DateTime? date
        )
    {
        return await _tournamentRepository
            .GetQueryable()
            .WhereIf(filterName.IsNotNullOrEmpty(), t => t.NormalizedName.Contains(filterName))
            .WhereIf(date != null, t => t.ActionDate.Value.Date == date.Value.Date)
            .Select(t => new IdName(t.Id,
                (t.ActionDate != null
                    ? $"{t.ActionDate.Value:dd/MM/yy} - "
                    : string.Empty)
                + t.Name))
            .Take(5)
            .ToListAsync();
    }

    [HttpGet("cities")]
    public async Task<IEnumerable<string>> GetCitiesAsync()
    {
        return await _locationRepository.GetQueryable().Select(l => l.City).Distinct().ToListAsync();
    }
}