using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MG.WebAPi.Database;
using MG.WebAPi.Entities.Interfaces;
using MG.WebAPi.Models;
using MG.WebAPi.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace MG.WebAPi.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private MgContext Context { get; set; }
        protected DbSet<T> DbSet => Context.Set<T>();
        private IDbContextTransaction Transaction { get; set; }

        public Repository(MgContext context)
        {
            Context = context;
        }

        public async Task<List<T>> GetAllAsync()
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

        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> expression, string include = null, int? skip = null,
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

        private IQueryable<T> Include(IQueryable<T> query, string include)
        {
            return include.IsNullOrEmpty() ? query : query.Include(include);
        }

        public IQueryable<T> GetPage(IQueryable<T> query, PageRequest page)
        {
            query = query.OrderBy(e => e.CreatedDate);
            if (page.PageNumber > 1)
                query = query.Skip((page.PageNumber - 1) * page.PageSize);
            return query.Take(page.PageSize);
        }

        public async Task<T> GetByIdAsync(Guid id, string include = null)
        {
            var query = GetQueryable();
            query = Include(query, include);
            return await query.FirstOrDefaultAsync(entity => entity.Id == id);
        }

        public async Task InsertAsync(T entity)
        {
            entity.CreatedDate = DateTime.UtcNow;
            entity.Deleted = false;
            await DbSet.AddAsync(entity);
        }

        public void Update(T entity)
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

        public IQueryable<T> GetQueryable()
        {
            return DbSet.Where(entity => !entity.Deleted).AsQueryable();
        }
    }
}