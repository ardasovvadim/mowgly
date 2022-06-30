using System.ComponentModel.DataAnnotations;
using AutoMapper;
using MG.WebHost.Database;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using MG.WebHost.Models.Masters;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Services
{
    public interface IMasterService : IService<MasterVm, User>
    {
        Task<Page<MasterVm>> GetCardMastersBySearchCriteriaAsync(MasterSearchCriteriaRequest request);
        Task<MasterVm> GetMasterInfoAsync(Guid masterId);
        Task<MasterEditModel> GetMasterEditModel(Guid masterId);
        Task<MasterEditModel> SaveAsync(MasterEditModel model);
    }

    public class MasterService : Service<MasterVm, User>, IMasterService
    {
        public MasterService(IRepository<User> repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<Page<MasterVm>> GetCardMastersBySearchCriteriaAsync(MasterSearchCriteriaRequest request)
        {
            var cardMasterProfileKeys = new []
            {
                UserProfileKeys.CardMasterAchievements,
                UserProfileKeys.CardMasterAvatarImage
            };
            
            var query = Repository.GetQueryable()
                .Where(user => user.UserTypes == UserType.Master)
                .WhereIf(request.FilterText.IsNotNullOrEmpty(), e => e.NormalizedName.Contains(request.FilterText.Trim()))
                .WhereIf(request.City.IsNotNullOrEmpty(), e => e.TimetableRecords.Any(t => t.Location.City.Contains(request.City.Trim())))
                .WhereIf(request.Section != null, e => e.TimetableRecords.Any(t => t.SectionId == request.Section))
                ;

            if (request.LocationIds.Any() && request.SectionIds.Any())
                query = query.Where(u => u.TimetableRecords.Any(t => request.LocationIds.Contains(t.LocationId) && request.SectionIds.Contains(t.SectionId)));
            else if (request.LocationIds.Any())
                query = query.Where(u => u.TimetableRecords.Any(t => request.LocationIds.Contains(t.LocationId)));
            else if (request.SectionIds.Any())
                query = query.Where(u => u.TimetableRecords.Any(t => request.SectionIds.Contains(t.SectionId)));

            query = query.Include(user => user.Profiles.Where(p => cardMasterProfileKeys.Contains(p.Name)));
            var originalQuery = query;
            var pagedQuery = query.Page(request);
            var entities = await pagedQuery.ToListAsync();
            var entitiesCount = originalQuery.Count();
            var result = Mapper.Map<IEnumerable<MasterVm>>(entities);
            return new Page<MasterVm>
            {
                Count = entitiesCount,
                Elements = result,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
            };
        }

        public async Task<MasterVm> GetMasterInfoAsync(Guid masterId)
        {
            var masterInfoProfileKeys = new []
            {
                UserProfileKeys.MasterDescriptions,
                UserProfileKeys.MasterProfileImage,
                UserProfileKeys.MasterWithImages,
                UserProfileKeys.MasterInstagramLink,
                UserProfileKeys.MasterFacebookLink
            };
            
            var entity = await Repository
                .GetQueryable()
                .Include(u => u.Profiles.Where(p => masterInfoProfileKeys.Contains(p.Name)))
                .FirstOrDefaultAsync(u => u.Id == masterId);
            
            return Mapper.Map<MasterVm>(entity);
        }

        public async Task<MasterEditModel> GetMasterEditModel(Guid masterId)
        {
            var entity = await GetMasterEditModelEntityAsync(masterId);
            return Mapper.Map<MasterEditModel>(entity);
        }

        private Task<User> GetMasterEditModelEntityAsync(Guid id)
        {
            return Repository
                .GetQueryable()
                .Include(u => u.Profiles)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<MasterEditModel> SaveAsync(MasterEditModel model)
        {
            if (model == null)
                return null;

            var isNew = model.Id == null;
            using var transaction = await Repository.BeginTransactionAsync();

            try
            {
                await ValidateModelAsync(model, isNew);
            
                var entity = isNew 
                    ? new User { UserTypes = UserType.Master }
                    : await GetMasterEditModelEntityAsync(model.Id.Value);
                if (entity == null)
                    throw new ArgumentException("Пользователь не был найден");

                if (isNew)
                    await Repository.InsertAsync(entity);
                else 
                    Repository.Update(entity);
                
                Mapper.Map(model, entity);
                
                await Repository.CommitTransactionAsync();
                await Repository.SaveChangesAsync();
                
                return Mapper.Map<MasterEditModel>(entity);
            }
            catch (Exception)
            {
                await Repository.RollbackTransactionAsync();
                throw;
            }
        }

        private async Task ValidateModelAsync(MasterEditModel model, bool isNew)
        {
            var validationExceptions = new List<Exception>();
            var invalidEmail = false;
            var invalidPhone = false;
            
            if (!model.Email.IsNullOrEmpty())
                invalidEmail = isNew 
                    ? await Repository.GetQueryable().AnyAsync(u => u.Email == model.Email)
                    : await Repository.GetQueryable().AnyAsync(u => u.Email == model.Email && u.Id != model.Id);
            
            if (!model.Phone.IsNullOrEmpty())
                invalidPhone = isNew 
                    ? await Repository.GetQueryable().AnyAsync(u => u.PhoneNumber == model.Phone)
                    : await Repository.GetQueryable().AnyAsync(u => u.PhoneNumber == model.Phone && u.Id != model.Id);
                
            if (invalidEmail)
                validationExceptions.Add(new ValidationException("Пользователь с таким емейлом уже существует"));
            
            if (invalidPhone)
                validationExceptions.Add(new ValidationException("Пользователь с таким мобильным телефоном уже существует"));

            if (validationExceptions.Any())
                throw new AggregateException("Ошибки валидации", validationExceptions);
        }
    }
}