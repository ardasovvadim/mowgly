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
        Task<GetTimetableRecordsResponse> GetTimeTableRecordsAsync(TimeTableRecordCriteriaRequest request);
        Task<TimetableRecordEditModel> AddTimetableRecordAsync(TimetableRecordEditModel request);
        Task DeleteAsync(Guid id);
    }

    public class TimetableRecordService : ITimetableRecordService
    {
        private readonly IRepository<TimetableRecord> _repository;
        private readonly IRepository<Location> _locationRepository;
        private readonly IRepository<Section> _sectionRepository;
        private readonly IRepository<User> _masterRepository;
        private readonly IMapper Mapper;

        public TimetableRecordService(
            IRepository<TimetableRecord> repository, 
            IMapper mapper, 
            IRepository<Location> locationRepository, 
            IRepository<Section> sectionRepository, 
            IRepository<User> masterRepository)
        {
            _repository = repository;
            Mapper = mapper;
            _locationRepository = locationRepository;
            _sectionRepository = sectionRepository;
            _masterRepository = masterRepository;
        }

        public async Task<IEnumerable<TimetableRecordLocationGroupVm>> GetTimeTableRecordsByCriteria(TimeTableRecordCriteriaRequest criteria)
        {
            var query = FilterQuery(_repository.GetQueryable(), criteria);

            // todo: probably needs refactor
            query = query.Include(r => r.Master)
                .Include(r => r.Section)
                .Include(r => r.Location);

            var entities = await query.ToListAsync();
            var timetableLocationGroups = new List<TimetableRecordLocationGroupVm>();

            foreach (var filteringGroup in entities.GroupBy(e => new { e.LocationId, e.SectionId }))
            {
                var locationFilteredEntities = entities.Where(e => e.LocationId == filteringGroup.Key.LocationId && e.SectionId == filteringGroup.Key.SectionId).ToList();
                var timetableMasterGroups = new List<TimetableRecordMasterGroupVm>();

                foreach (var masterId in locationFilteredEntities.Select(e => e.MasterId).Distinct())
                {
                    var masterFilteredEntities = locationFilteredEntities.Where(e => e.MasterId == masterId).ToList();
                    var timetables = Mapper.Map<List<TimetableRecordVm>>(masterFilteredEntities);

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

        public async Task<GetTimetableRecordsResponse> GetTimeTableRecordsAsync(TimeTableRecordCriteriaRequest request)
        {
            var query = FilterQuery(_repository.GetQueryable(), request);

            return new GetTimetableRecordsResponse
            {
                Data = Mapper.Map<IEnumerable<TimetableRecordEditModel>>(await query.ToListAsync()),
                Masters = _masterRepository.GetQueryable().Select(l => new IdName{Id = l.Id, Name = l.ConcatName()}),
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
            
            Mapper.Map(request, entity);

            if (isNew)
                await _repository.InsertAsync(entity);
            else
                _repository.Update(entity);

            await _repository.SaveChangesAsync();

            return Mapper.Map<TimetableRecordEditModel>(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
            await _repository.SaveChangesAsync();
        }

        private IQueryable<TimetableRecord> FilterQuery(IQueryable<TimetableRecord> query, TimeTableRecordCriteriaRequest request)
        {
            var filterText = request.FilterText?.Trim().ToUpper();
            return query
                .WhereIf(request.LocationId != null, r => request.LocationId == r.LocationId)
                .WhereIf(request.MasterId != null, r => request.MasterId == r.MasterId)
                .WhereIf(request.SectionId != null, r => request.SectionId == r.SectionId)
                .WhereIf(!request.City.IsNullOrEmpty(), r => r.Location.City.Contains(request.City))
                .WhereIf(!filterText.IsNullOrEmpty(), r => r.Master.NormalizedName.Contains(filterText));
        }
    }
}