using System.Linq.Expressions;
using MG.WebHost.Config;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Models;
using MG.WebHost.Models.Sections;
using MG.WebHost.Services;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Controllers
{
    public class SectionController : BaseController
    {
        private readonly IBaseService _sectionService;

        public SectionController(IBaseService sectionService)
        {
            _sectionService = sectionService;
        }

        [HttpPost("GetSectionsByLocationId")]
        public async Task<IEnumerable<SectionVm>> GetSectionsByLocationIdAsync(SearchSectionRequest request)
        {
            return (await BaseService.GetListAsync<SectionVm, Section>(
                new PageRequest { PageNumber = 0, PageSize = int.MaxValue, SortOrder = SortOrder.Asc, Sort = "Name" },
                query =>
                {
                    return query
                        .WhereIf(request.LocationId != null, s => s.Locations.Any(l => l.Id == request.LocationId))
                        .Include(e => e.Settings);
                }))?.Elements;
        }

        [HttpPost("list"), Authorize(MgPermissions.Section.Get)]
        public async Task<Page<AdminSectionVm>> GetListAsync(FilterPageRequest request)
        {
            return await _sectionService.GetListAsync<AdminSectionVm, Section>(
                request, query =>
                {
                    var filterText = request.FilterText?.Trim().ToUpper();
                    return query.WhereIf(filterText.IsNotNullOrEmpty(), s => s.Name.Contains(filterText))
                        .Include(s => s.TimetableRecords);
                });
        }

        [HttpGet("{id}"), Authorize(MgPermissions.Section.Get)]
        public async Task<SectionVm> GetByIdAsync(Guid id)
        {
            return await _sectionService.GetByIdAsync<SectionVm, Section>(id, nameof(Section.Settings));
        }

        [HttpPost, Authorize(MgPermissions.Section.Create)]
        public async Task<SectionVm> UpdateAsync(SectionVm request)
        {
            return await _sectionService.SaveAsync<SectionVm, Section>(request);
        }

        [HttpDelete("{id}"), Authorize(MgPermissions.Section.Delete)]
        public async Task DeleteAsync(Guid id) => await _sectionService.DeleteAsync<Section>(id);
    }
}