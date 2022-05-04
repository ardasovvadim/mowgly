using System.Linq.Expressions;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Models;

namespace MG.WebHost.Repositories
{
    public interface IRepository<TEntity> where TEntity : class, IBaseEntity
    {
        IQueryable<TEntity> GetQueryable();
        Task<List<TEntity>> GetAllAsync();
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression, string include = null, int? skip = null, int? take = null);
        IQueryable<TEntity> GetPage(IQueryable<TEntity> query, PageRequest page);
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