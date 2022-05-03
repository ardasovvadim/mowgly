using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MG.WebAPi.Entities.Interfaces;
using MG.WebAPi.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace MG.WebAPi.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetQueryable();
        Task<List<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> expression, string include = null, int? skip = null, int? take = null);
        IQueryable<T> GetPage(IQueryable<T> query, PageRequest page);
        Task<T> GetByIdAsync(Guid id, string include = null);
        Task InsertAsync(T entity);
        void Update(T entity);
        Task<bool> DeleteAsync(Guid id);
        Task<bool> IsExistsAsync(Guid id);
        Task SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
    }
}