using System.Linq.Expressions;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Models;

namespace MG.WebHost.Services
{
    public interface IService<TDto, TEntity> 
        where TDto : BaseDto 
        where TEntity : class, IBaseEntity
    {
        Task<IEnumerable<TDto>> GetAllAsync();
        Task<IEnumerable<TDto>> GetAsync(Expression<Func<TEntity, bool>> whereExpression, string include = null);
        Task<Page<TDto>> GetListAsync(PageRequest pageRequest);
        Task<TDto> SaveAsync(TDto dto);
        Task<bool> DeleteAsync(Guid key);
    }
}