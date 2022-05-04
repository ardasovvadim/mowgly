using System.Linq;
using System.Threading.Tasks;
using MG.WebHost.Controllers;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Models;
using MG.WebHost.Models.Options;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Controllers;

public class OptionsController : BaseController
{
    private readonly IRepository<Section> _sectionRepository;
    private readonly IRepository<Location> _locationRepository;

    public OptionsController(IRepository<Section> sectionRepository, 
        IRepository<Location> locationRepository)
    {
        _sectionRepository = sectionRepository;
        _locationRepository = locationRepository;
    }

    [HttpPost]
    public async Task<OptionsResponse> GetOptions(OptionsRequest request)
    {
        var result = new OptionsResponse();

        if (request.Cities)
            result.Cities = (await _locationRepository.GetQueryable().Select(l => l.City).Distinct().ToListAsync()).Where(c => !c.IsNullOrEmpty());

        if (request.Locations)
            result.Locations = await _locationRepository.GetQueryable().Select(l => new IdName { Id = l.Id, Name = l.Name }).ToListAsync();

        if (request.Sections)
            result.Sections = await _sectionRepository.GetQueryable().Select(s => new IdName { Id = s.Id, Name = s.Name }).ToListAsync();
        
        return result;
    }
}