using System.Linq.Expressions;
using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Contracts
{
    public interface IService<TDto, TEntity> 
        where TDto : BaseDto 
        where TEntity : class, IBaseEntity
    {
        Task<IEnumerable<TDto>> GetAllAsync();
        Task<IEnumerable<TDto>> GetAsync(Expression<Func<TEntity, bool>> whereExpression, string include = null);
        Task<Page<TDto>> GetListAsync(PageRequest pageRequest, Func<IQueryable<TEntity>, IQueryable<TEntity>> where = null, string include = null);
        Task<TDto> SaveAsync(TDto dto);
        Task<bool> DeleteAsync(Guid key);
    }
}