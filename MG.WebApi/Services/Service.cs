using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using MG.WebAPi.Entities.Interfaces;
using MG.WebAPi.Models;
using MG.WebAPi.Repositories;

namespace MG.WebAPi.Services
{
    public class Service<Dto, Entity> : IService<Dto, Entity>
        where Dto : BaseDto 
        where Entity : BaseEntity
    {
        protected readonly IRepository<Entity> _repository;
        protected readonly IMapper _mapper;

        public Service(IRepository<Entity> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Dto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<Dto>>(entities);
        }

        public async Task<IEnumerable<Dto>> GetAsync(Expression<Func<Entity, bool>> whereExpression, string include = null)
        {
            var entities = await _repository.GetAsync(whereExpression, include);
            return _mapper.Map<IEnumerable<Dto>>(entities);
        }

        public async Task<Dto> SaveAsync(Dto dto)
        {
            var entity = await _repository.GetByIdAsync(dto.Id);

            if (entity == null)
            {
                entity = _mapper.Map<Entity>(dto);
                await _repository.InsertAsync(entity);
            }
            else
            {
                _mapper.Map(dto, entity);
                _repository.Update(entity);
            }

            await _repository.SaveChangesAsync();

            return _mapper.Map<Dto>(entity);
        }

        public async Task<bool> DeleteAsync(Guid key)
        {
            var result = await _repository.DeleteAsync(key);
            await _repository.SaveChangesAsync();
            return result;
        }
    }
}