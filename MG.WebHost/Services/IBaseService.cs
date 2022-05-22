using System.Linq.Expressions;
using AutoMapper;
using MG.WebHost.Database;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Models;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Services;

public interface IBaseService
{
    Task<IEnumerable<TDto>> GetAllAsync<TDto, TEntity>()
        where TDto : class
        where TEntity : BaseEntity;

    Task<TDto> GetByIdAsync<TDto, TEntity>(Guid id, string include = null)
        where TDto : class
        where TEntity : BaseEntity;
    
    Task<IEnumerable<TDto>> GetAsync<TDto, TEntity>(Expression<Func<TEntity, bool>> whereExpression, string include = null)
        where TDto : class
        where TEntity : BaseEntity;

    Task<Page<TDto>> GetListAsync<TDto, TEntity>(
        PageRequest pageRequest,
        Func<IQueryable<TEntity>, IQueryable<TEntity>> where = null,
        string include = null
    )
        where TDto : class
        where TEntity : BaseEntity;
    
    Task<TDto> SaveAsync<TDto, TEntity>(TDto dto)
        where TDto : BaseDto
        where TEntity : BaseEntity;

    Task<bool> DeleteAsync<TEntity>(Guid key)
        where TEntity : BaseEntity;
}

public class BaseService : IBaseService
{
    private IServiceProvider ServiceProvider { get; }
    protected IMapper Mapper => ServiceProvider.GetService<IMapper>();
    protected IRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity => ServiceProvider.GetRequiredService<IRepository<TEntity>>();

    public BaseService(IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
    }

    public async Task<IEnumerable<TDto>> GetAllAsync<TDto, TEntity>()
        where TDto : class
        where TEntity : BaseEntity
    {
        var entities = await Repository<TEntity>().GetAllAsync();
        return Mapper.Map<IEnumerable<TDto>>(entities);
    }

    public async Task<TDto> GetByIdAsync<TDto, TEntity>(Guid id, string include = null) where TDto : class where TEntity : BaseEntity
    {
        return Mapper.Map<TDto>(await Repository<TEntity>().GetByIdAsync(id, include));
    }

    public async Task<IEnumerable<TDto>> GetAsync<TDto, TEntity>(Expression<Func<TEntity, bool>> whereExpression, string include = null)
        where TDto : class
        where TEntity : BaseEntity
    {
        var entities = await Repository<TEntity>().GetAsync(whereExpression, include);
        return Mapper.Map<IEnumerable<TDto>>(entities);
    }

    public async Task<Page<TDto>> GetListAsync<TDto, TEntity>(PageRequest pageRequest, Func<IQueryable<TEntity>, IQueryable<TEntity>> where = null, string include = null)
        where TDto : class
        where TEntity : BaseEntity
    {
        var query = Repository<TEntity>()
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

    public virtual async Task<TDto> SaveAsync<TDto, TEntity>(TDto dto) where TDto : BaseDto where TEntity : BaseEntity
    {
        var repository = Repository<TEntity>();
        var entity = dto.Id.HasValue ? await repository.GetByIdAsync(dto.Id.Value) : null;

        if (entity == null)
        {
            entity = Mapper.Map<TEntity>(dto);
            await repository.InsertAsync(entity);
        }
        else
        {
            Mapper.Map(dto, entity);
            repository.Update(entity);
        }

        await repository.SaveChangesAsync();

        return Mapper.Map<TDto>(entity);
    }

    public async Task<bool> DeleteAsync<TEntity>(Guid key) where TEntity : BaseEntity
    {
        var repository = Repository<TEntity>();
        var result = await repository.DeleteAsync(key);
        await repository.SaveChangesAsync();
        return result;
    }
    
}