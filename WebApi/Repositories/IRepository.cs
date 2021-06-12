using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using WebApi.Entities.Interfaces;

namespace WebApi.Repositories
{
    public interface IRepository<T> where T : IBaseEntity
    {
        IQueryable<T> GetQueryable();
        IEnumerable<T> GetAll();
        Task<List<T>> GetAllAsync();
        IEnumerable<T> Get(Expression<Func<T, bool>> expression, int? skip = null, int? take = null);
        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> expression, int? skip = null, int? take = null);
        T GetById(int id);
        Task<T> GetByIdAsync(int id);
        void Insert(T entity);
        Task InsertAsync(T entity);
        void Update(T entity);
        void Delete(int id);
        Task DeleteAsync(int id);
        bool IsExists(int id);
        Task<bool> IsExistsAsync(int id);
        void SaveChanges();
        Task SaveChangesAsync();
        void BeginTransaction();
        Task BeginTransactionAsync();
        void CommitTransaction();
        void CommitTransactionAsync();
        void RollbackTransaction();
        Task RollbackTransactionAsync();
    }

    public class Repository<T> : IRepository<T> where T : class, IBaseEntity
    {
        private DbContext Context { get; set; }
        protected DbSet<T> DbSet => Context.Set<T>();
        private IDbContextTransaction Transaction { get; set; }

        public Repository(DbContext context)
        {
            Context = context;
        }

        public IEnumerable<T> GetAll()
        {
            return DbSet.Where(entity => !entity.Deleted).ToList();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await DbSet.Where(entity => !entity.Deleted).ToListAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await DbSet.FindAsync(id);
            entity.Deleted = true;
            Update(entity);
        }

        public void CommitTransactionAsync()
        {
            Transaction?.CommitAsync();
        }

        public void RollbackTransaction()
        {
            Transaction?.Rollback();
        }

        public async Task RollbackTransactionAsync()
        {
            if (Transaction != null)
                await Transaction?.RollbackAsync();
        }

        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> expression, int? skip = null,
            int? take = null)
        {
            var query = DbSet
                .Where(expression)
                .Where(entity => !entity.Deleted);

            if (skip.HasValue)
                query = query.Skip(skip.Value);
            if (take.HasValue)
                query = query.Take(take.Value);

            return await query.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await DbSet.FirstOrDefaultAsync(entity => entity.Id == id && !entity.Deleted);
        }

        public async Task InsertAsync(T entity)
        {
            entity.CreatedDate = DateTime.UtcNow;
            entity.UpdatedDate = DateTime.UtcNow;
            entity.Deleted = false;
            await DbSet.AddAsync(entity);
        }

        public void Update(T entity)
        {
            entity.UpdatedDate = DateTime.Now;
            Context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            var entity = DbSet.Find(id);
            entity.Deleted = true;
            Update(entity);
        }

        public async Task<bool> IsExistsAsync(int id)
        {
            return await DbSet.AnyAsync(entity => entity.Id == id && !entity.Deleted);
        }

        public void SaveChanges()
        {
            Context.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await Context.SaveChangesAsync();
        }

        public void BeginTransaction()
        {
            Transaction = Context.Database.BeginTransaction();
        }

        public async Task BeginTransactionAsync()
        {
            Transaction = await Context.Database.BeginTransactionAsync();
        }

        public void CommitTransaction()
        {
            Transaction?.Commit();
        }

        public IQueryable<T> GetQueryable()
        {
            return DbSet.Where(entity => !entity.Deleted).AsQueryable();
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> expression, int? skip = null, int? take = null)
        {
            var query = DbSet
                .Where(expression)
                .Where(entity => !entity.Deleted);

            if (skip.HasValue)
                query = query.Skip(skip.Value);
            if (take.HasValue)
                query = query.Take(take.Value);

            return query.ToList();
        }

        public T GetById(int id)
        {
            return DbSet.FirstOrDefault(entity => entity.Id == id && !entity.Deleted);
        }

        public void Insert(T entity)
        {
            entity.CreatedDate = DateTime.UtcNow;
            entity.UpdatedDate = DateTime.UtcNow;
            entity.Deleted = false;
            DbSet.Add(entity);
        }

        public bool IsExists(int id)
        {
            return DbSet.Any(entity => entity.Id == id && !entity.Deleted);
        }
    }
}