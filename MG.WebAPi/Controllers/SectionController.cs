using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MG.WebAPi.Controllers;
using MG.WebApi.Entities.Sections;
using MG.WebAPi.Models.Sections;
using MG.WebAPi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebApi.Controllers
{
    public class SectionController : BaseController
    {
        private readonly IService<SectionVm, Section> _sectionService;

        public SectionController(IService<SectionVm, Section> sectionService)
        {
            _sectionService = sectionService;
        }

        [HttpPost("GetSectionsByLocationId")]
        public async Task<IEnumerable<SectionVm>> GetSectionsByLocationIdAsync(SearchSectionRequest request)
        {
            var sections = await _sectionService.GetAsync(section => section.Locations.Any(l => l.Id == request.LocationId), $"{nameof(Section.Settings)}");
            return sections?.OrderBy(s => s.Settings.FirstOrDefault(setting => setting.Name == SectionSettingKeys.CardOrder)?.Value ?? string.Empty);
        }
    }
}