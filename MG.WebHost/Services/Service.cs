using System.Linq.Expressions;
using AutoMapper;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Models;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Services
{
    public class Service<TDto, TEntity> : IService<TDto, TEntity>
        where TDto : BaseDto 
        where TEntity : class, IBaseEntity
    {
        protected readonly IRepository<TEntity> Repository;
        protected readonly IMapper Mapper;

        public Service(IRepository<TEntity> repository, IMapper mapper)
        {
            Repository = repository;
            Mapper = mapper;
        }

        public async Task<IEnumerable<TDto>> GetAllAsync()
        {
            var entities = await Repository.GetAllAsync();
            return Mapper.Map<IEnumerable<TDto>>(entities);
        }

        public async Task<IEnumerable<TDto>> GetAsync(Expression<Func<TEntity, bool>> whereExpression, string include = null)
        {
            var entities = await Repository.GetAsync(whereExpression, include);
            return Mapper.Map<IEnumerable<TDto>>(entities);
        }

        public async Task<Page<TDto>> GetListAsync(PageRequest pageRequest, Func<IQueryable<TEntity>, IQueryable<TEntity>> where = null, string include = null)
        {
            var query = Repository
                .GetQueryable()
                .WhereIf(where != null, where)
                .IncludeIf(!include.IsNullOrEmpty(), include);

            return new Page<TDto>
            {
                Count = await query.CountAsync(),
                PageSize = pageRequest.PageSize,
                PageNumber = pageRequest.PageNumber,
                Elements = Mapper.Map<IEnumerable<TDto>>(await query.Page(pageRequest).ToListAsync())
            };
        }

        public async Task<TDto> SaveAsync(TDto dto)
        {
            var entity = dto.Id.HasValue ? await Repository.GetByIdAsync(dto.Id.Value) : null;

            if (entity == null)
            {
                entity = Mapper.Map<TEntity>(dto);
                await Repository.InsertAsync(entity);
            }
            else
            {
                Mapper.Map(dto, entity);
                Repository.Update(entity);
            }

            await Repository.SaveChangesAsync();

            return Mapper.Map<TDto>(entity);
        }

        public async Task<bool> DeleteAsync(Guid key)
        {
            var result = await Repository.DeleteAsync(key);
            await Repository.SaveChangesAsync();
            return result;
        }
    }
}