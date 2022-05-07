using AutoMapper;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Users;
using MG.WebHost.Exceptions;
using MG.WebHost.Models;
using MG.WebHost.Models.TimetableRecords;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Services
{
    public interface ITimetableRecordService
    {
        Task<IEnumerable<TimetableRecordLocationGroupVm>> GetTimeTableRecordsByCriteria(TimeTableRecordCriteriaRequest criteria);
        Task<TimetableRecordEditModelResponse> GetTimeTableRecordEditModelAsync(TimeTableRecordCriteriaRequest request);
        Task<TimetableRecordEditModel> AddTimetableRecordAsync(TimetableRecordEditModel request);
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
            var query = _repository
                .GetQueryable()
                .WhereIf(criteria.Cities != null && criteria.Cities.Any(), r => criteria.Cities.Contains(r.Location.City));

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
            var filterText = request.FilterText?.Trim().ToUpper();
            var query = _repository.GetQueryable()
                .WhereIf(request.LocationGuids?.Any() ?? false, r => request.LocationGuids.Contains(r.LocationId))
                .WhereIf(request.MasterGuids?.Any() ?? false, r => request.MasterGuids.Contains(r.MasterId))
                .WhereIf(request.SectionGuids?.Any() ?? false, r => request.SectionGuids.Contains(r.SectionId))
                .WhereIf(!filterText.IsNullOrEmpty(), r => r.Master.NormalizedName.Contains(filterText));

            return new TimetableRecordEditModelResponse
            {
                Data = _mapper.Map<IEnumerable<TimetableRecordEditModel>>(await query.ToListAsync()),
                Masters = _masterRepository.GetQueryable().Select(l => new IdName{Id = l.Id, Name = $"{l.FirstName} {l.LastName} {l.MiddleName}"}),
            };
        }

        public async Task<TimetableRecordEditModel> AddTimetableRecordAsync(TimetableRecordEditModel request)
        {
            var isNew = !request.Id.HasValue;
            var entity = request.Id.HasValue
                ? await _repository.GetByIdAsync(request.Id.Value)
                : new TimetableRecord();

            if (entity == null)
                throw new BusinessException("Not found");
            
            _mapper.Map(request, entity);

            if (isNew)
                await _repository.InsertAsync(entity);
            else
                _repository.Update(entity);

            return _mapper.Map<TimetableRecordEditModel>(entity);
        }
    }
}