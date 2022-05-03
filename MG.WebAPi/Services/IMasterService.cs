using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MG.WebAPi.Data;
using MG.WebApi.Entities;
using MG.WebAPi.Entities.Enums;
using MG.WebApi.Entities.Users;
using MG.WebAPi.Models;
using MG.WebAPi.Models.Masters;
using MG.WebAPi.Repositories;
using Microsoft.EntityFrameworkCore;

namespace MG.WebAPi.Services
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
            
            var query = _repository.GetQueryable()
                .Where(user => user.UserTypes == UserType.Master);

            if (request.LocationIds.Any() && request.SectionIds.Any())
                query = query.Where(user => user.Sections.Any(section => request.SectionIds.Contains(section.Id) && section.Locations.Any(location => request.LocationIds.Contains(location.Id))));
            else if (request.LocationIds.Any())
                query = query.Where(user => user.Sections.Any(section => section.Locations.Any(location => request.LocationIds.Contains(location.Id))));
            else if (request.SectionIds.Any())
                query = query.Where(user => user.Sections.Any(section => request.SectionIds.Contains(section.Id)));

            query = query.Include(user => user.Profiles.Where(p => cardMasterProfileKeys.Contains(p.Name)));
            var originalQuery = query;
            var pagedQuery = _repository.GetPage(query, request.PageRequest);
            var entities = await pagedQuery.ToListAsync();
            var entitiesCount = originalQuery.Count();
            var result = _mapper.Map<IEnumerable<MasterVm>>(entities);
            return new Page<MasterVm>
            {
                Count = entitiesCount,
                Elements = result,
                PageNumber = request.PageRequest.PageNumber,
                PageSize = request.PageRequest.PageSize,
            };
        }

        public async Task<MasterVm> GetMasterInfoAsync(Guid masterId)
        {
            var masterInfoProfileKeys = new []
            {
                UserProfileKeys.MasterDescriptions,
                UserProfileKeys.MasterProfileImage,
                UserProfileKeys.MasterWithImages
            };
            
            var entity = await _repository
                .GetQueryable()
                .Include(u => u.Profiles.Where(p => masterInfoProfileKeys.Contains(p.Name)))
                .FirstOrDefaultAsync(u => u.Id == masterId);
            
            return _mapper.Map<MasterVm>(entity);
        }

        public async Task<MasterEditModel> GetMasterEditModel(Guid masterId)
        {
            var entity = await GetMasterEditModelEntityAsync(masterId);
            return _mapper.Map<MasterEditModel>(entity);
        }

        private Task<User> GetMasterEditModelEntityAsync(Guid id)
        {
            return _repository
                .GetQueryable()
                .Include(u => u.Profiles)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<MasterEditModel> SaveAsync(MasterEditModel model)
        {
            if (model == null)
                return null;

            var isNew = model.Id == Guid.Empty;
            await _repository.BeginTransactionAsync();

            try
            {
                await ValidateModelAsync(model, isNew);
            
                var entity = isNew 
                    ? new User()
                    : await GetMasterEditModelEntityAsync(model.Id);
                if (entity == null)
                    throw new ArgumentException("Пользователь не был найден");
                _mapper.Map(model, entity);
                
                await _repository.SaveChangesAsync();
                await _repository.CommitTransactionAsync();
                
                return _mapper.Map<MasterEditModel>(entity);
            }
            catch (Exception)
            {
                await _repository.RollbackTransactionAsync();
                throw;
            }
        }

        private async Task ValidateModelAsync(MasterEditModel model, bool isNew)
        {
            var validationExceptions = new List<Exception>();
            var invalidEmail = false;
            var invalidPhone = false;
            
            if (isNew)
            {
                invalidEmail = await _repository.GetQueryable().AnyAsync(u => u.Email == model.Email);
                invalidPhone = await _repository.GetQueryable().AnyAsync(u => u.PhoneNumber == model.Phone);
            }
            else
            {
                invalidEmail = await _repository.GetQueryable().AnyAsync(u => u.Email == model.Email && u.Id != model.Id);
                invalidPhone = await _repository.GetQueryable().AnyAsync(u => u.PhoneNumber == model.Phone && u.Id != model.Id);
            }
            
            if (invalidEmail)
                validationExceptions.Add(new ValidationException("Пользователь с таким емейлом уже существует"));
            if (invalidPhone)
                validationExceptions.Add(new ValidationException("Пользователь с таким мобильным телефоном уже существует"));

            if (validationExceptions.Any())
                throw new AggregateException("Ошибки валидации");
        }
    }
}