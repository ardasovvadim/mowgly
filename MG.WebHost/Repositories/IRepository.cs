using System.Linq.Expressions;
using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Repositories
{
    public interface IRepository<TEntity> where TEntity : class, IBaseEntity
    {
        IQueryable<TEntity> GetQueryable();
        Task<List<TEntity>> GetAllAsync();
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression, string include = null, int? skip = null, int? take = null);
        Task<TEntity> GetByIdAsync(Guid id, string include = null);
        Task InsertAsync(TEntity entity);
        void Update(TEntity entity);
        Task<bool> DeleteAsync(Guid id);
        Task<bool> IsExistsAsync(Guid id);
        Task SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
    }
}