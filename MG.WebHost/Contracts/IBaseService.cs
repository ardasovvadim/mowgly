using System.Linq.Expressions;
using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Contracts;

public interface IBaseService
{
    Task<IEnumerable<TDto>> GetAllAsync<TDto, TEntity>()
        where TDto : class
        where TEntity : class, IBaseEntity;

    Task<TDto> GetByIdAsync<TDto, TEntity>(Guid id, string include = null, Func<IQueryable<TEntity>, IQueryable<TEntity>> expr = null)
        where TDto : class
        where TEntity : class, IBaseEntity;
    
    Task<IEnumerable<TDto>> GetAsync<TDto, TEntity>(Expression<Func<TEntity, bool>> whereExpression, string include = null)
        where TDto : class
        where TEntity : class, IBaseEntity;

    Task<Page<TDto>> GetListAsync<TDto, TEntity>(
        PageRequest pageRequest,
        Func<IQueryable<TEntity>, IQueryable<TEntity>> where = null,
        string include = null
    )
        where TDto : class
        where TEntity : class, IBaseEntity;
    
    Task<TDto> SaveAsync<TDto, TEntity>(TDto dto)
        where TDto : BaseDto
        where TEntity : class, IBaseEntity;

    Task<bool> DeleteAsync<TEntity>(Guid key)
        where TEntity : class, IBaseEntity;
}