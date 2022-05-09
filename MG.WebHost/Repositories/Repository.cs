using System.Linq.Expressions;
using MG.WebHost.Database;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Models;
using MG.WebHost.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace MG.WebHost.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> 
        where TEntity : class, IBaseEntity
    {
        private MgContext Context { get; set; }
        protected DbSet<TEntity> DbSet => Context.Set<TEntity>();
        private IDbContextTransaction Transaction { get; set; }

        public Repository(MgContext context)
        {
            Context = context;
        }

        public async Task<List<TEntity>> GetAllAsync()
        {
            return await DbSet.Where(entity => !entity.Deleted).ToListAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await DbSet.FindAsync(id);

            if (entity == null)
                return false;
            
            entity.Deleted = true;
            Update(entity);
            return true;
        }

        public async Task CommitTransactionAsync()
        {
            if (Transaction != null)
            {
                await Transaction.CommitAsync();
                await Transaction.DisposeAsync();
                Transaction = null;
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (Transaction != null)
            {
                await Transaction.RollbackAsync();
                await Transaction.DisposeAsync();
                Transaction = null;
            }
        }

        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression, string include = null, int? skip = null,
            int? take = null)
        {
            var query = DbSet
                .WhereIf(expression != null, expression);

            query = Include(query, include);
            
            if (skip.HasValue)
                query = query.Skip(skip.Value);
            if (take.HasValue)
                query = query.Take(take.Value);

            return await query.ToListAsync();
        }

        private IQueryable<TEntity> Include(IQueryable<TEntity> query, string include)
        {
            return include.IsNullOrEmpty() ? query : query.Include(include);
        }

        public async Task<TEntity> GetByIdAsync(Guid id, string include = null)
        {
            var query = GetQueryable();
            query = Include(query, include);
            return await query.FirstOrDefaultAsync(entity => entity.Id == id);
        }

        public async Task InsertAsync(TEntity entity)
        {
            entity.CreatedDate = DateTime.UtcNow;
            entity.Deleted = false;
            await DbSet.AddAsync(entity);
        }

        public void Update(TEntity entity)
        {
            entity.UpdatedDate = DateTime.UtcNow;
            if (Context.Entry(entity).State != EntityState.Modified)
                Context.Entry(entity).State = EntityState.Modified;
        }

        public Task<bool> IsExistsAsync(Guid id)
        {
            return DbSet.AnyAsync(entity => entity.Id == id && !entity.Deleted);
        }

        public Task SaveChangesAsync()
        {
            return Context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            Transaction = await Context.Database.BeginTransactionAsync();
        }

        public IQueryable<TEntity> GetQueryable()
        {
            return DbSet.Where(entity => !entity.Deleted).AsQueryable();
        }
    }
}