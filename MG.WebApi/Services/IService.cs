using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MG.WebAPi.Entities.Interfaces;
using MG.WebAPi.Models;

namespace MG.WebAPi.Services
{
    public interface IService<Dto, Entity> 
        where Dto : BaseDto 
        where Entity : BaseEntity
    {
        Task<IEnumerable<Dto>> GetAllAsync();
        Task<IEnumerable<Dto>> GetAsync(Expression<Func<Entity, bool>> whereExpression, string include = null);
        Task<Dto> SaveAsync(Dto dto);
        Task<bool> DeleteAsync(Guid key);
    }
}