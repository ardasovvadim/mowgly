using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MG.WebApi.Entities;
using MG.WebApi.Entities.Sections;
using MG.WebAPi.Models;
using MG.WebApi.Models.TimetableRecords;
using MG.WebAPi.Repositories;
using MG.WebAPi.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MG.WebAPi.Services
{
    public interface ITimetableRecordService
    {
        Task<IEnumerable<TimetableRecordLocationGroupVm>> GetTimeTableRecordsByCriteria(TimeTableRecordCriteriaRequest criteria);
        Task<TimetableRecordEditModelResponse> GetTimeTableRecordEditModelAsync(TimeTableRecordCriteriaRequest request);
    }

    public class TimetableRecordService : ITimetableRecordService
    {
        private readonly IRepository<TimetableRecord> _repository;
        private readonly IRepository<Location> _locationRepository;
        private readonly IRepository<Section> _sectionRepository;
        private readonly IRepository<User> _masterRepository;
        private readonly IMapper _mapper;

        public TimetableRecordService(
            IRepository<TimetableRecord> repository, 
            IMapper mapper, 
            IRepository<Location> locationRepository, 
            IRepository<Section> sectionRepository, 
            IRepository<User> masterRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _locationRepository = locationRepository;
            _sectionRepository = sectionRepository;
            _masterRepository = masterRepository;
        }

        public async Task<IEnumerable<TimetableRecordLocationGroupVm>> GetTimeTableRecordsByCriteria(TimeTableRecordCriteriaRequest criteria)
        {
            var query = _repository.GetQueryable();

            if (criteria.MasterGuids != null && criteria.MasterGuids.Any())
                query = query.Where(r => criteria.MasterGuids.Contains(r.MasterId));

            if (criteria.SectionGuids != null && criteria.SectionGuids.Any())
                query = query.Where(r => criteria.SectionGuids.Contains(r.SectionId));

            if (criteria.LocationGuids != null && criteria.LocationGuids.Any())
                query = query.Where(r => criteria.LocationGuids.Contains(r.LocationId));

            query = query.Include(r => r.Master)
                .ThenInclude(r => r.Sections)
                .ThenInclude(r => r.Locations);

            var entities = await query.ToListAsync();
            var timetableLocationGroups = new List<TimetableRecordLocationGroupVm>();

            foreach (var filteringGroup in entities.GroupBy(e => new { e.LocationId, e.SectionId }))
            {
                var locationFilteredEntities = entities.Where(e => e.LocationId == filteringGroup.Key.LocationId && e.SectionId == filteringGroup.Key.SectionId).ToList();
                var timetableMasterGroups = new List<TimetableRecordMasterGroupVm>();

                foreach (var masterId in locationFilteredEntities.Select(e => e.MasterId).Distinct())
                {
                    var masterFilteredEntities = locationFilteredEntities.Where(e => e.MasterId == masterId).ToList();
                    var timetables = _mapper.Map<List<TimetableRecordVm>>(masterFilteredEntities);

                    if (!timetables.Any())
                        continue;

                    var masterEntity = masterFilteredEntities.First();
                    timetableMasterGroups.Add(new TimetableRecordMasterGroupVm
                    {
                        MasterName = $"{masterEntity.Master.FirstName} {masterEntity.Master.LastName}",
                        MasterId = masterEntity.MasterId,
                        Timetables = timetables
                    });
                }

                if (!timetableMasterGroups.Any())
                    continue;

                var locationEntity = locationFilteredEntities.First();
                timetableLocationGroups.Add(new TimetableRecordLocationGroupVm()
                {
                    City = locationEntity.Location.City,
                    LocationId = locationEntity.LocationId,
                    LocationName = locationEntity.Location.Name,
                    SectionId = locationEntity.SectionId,
                    SectionName = locationEntity.Section.Name,
                    Masters = timetableMasterGroups
                });
            }

            return timetableLocationGroups;
        }

        public async Task<TimetableRecordEditModelResponse> GetTimeTableRecordEditModelAsync(TimeTableRecordCriteriaRequest request)
        {
            var query = _repository.GetQueryable();
            
            query.WhereIf(request.LocationGuids?.Any() ?? false, r => request.LocationGuids.Contains(r.LocationId));
            query.WhereIf(request.MasterGuids?.Any() ?? false, r => request.MasterGuids.Contains(r.MasterId));
            query.WhereIf(request.SectionGuids?.Any() ?? false, r => request.SectionGuids.Contains(r.SectionId));
            
            query.WhereIf(request.LocationFilterName.IsNullOrEmpty(), r => r.Location.Name.ToLower().Contains(request.LocationFilterName.ToLower().Trim()));
            query.WhereIf(request.SectionFilterName.IsNullOrEmpty(), r => r.Section.Name.ToLower().Contains(request.SectionFilterName.ToLower().Trim()));
            
            var masterSplitedFilterName = request.MasterFilterName.ToLower().Trim().Split(" ").ToList();
            query.WhereIf(request.MasterFilterName.IsNullOrEmpty(), r =>
                masterSplitedFilterName.Contains(r.Master.FirstName.ToLower())
                || masterSplitedFilterName.Contains(r.Master.LastName)
                || masterSplitedFilterName.Contains(r.Master.MiddleName));

            return new TimetableRecordEditModelResponse
            {
                Data = _mapper.Map<IEnumerable<TimetableRecordEditModel>>(await query.ToListAsync()),
                Locations = _locationRepository.GetQueryable().Select(l => new IdName{Id = l.Id, Name = l.Name}),
                Masters = _masterRepository.GetQueryable().Select(l => new IdName{Id = l.Id, Name = $"{l.FirstName} {l.LastName} {l.MiddleName}"}),
                Sections = _sectionRepository.GetQueryable().Select(l => new IdName{Id = l.Id, Name = l.Name})
            };
        }
    }
}