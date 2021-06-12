using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        
    }

    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppContext context) : base(context)
        {
        }
    }
}