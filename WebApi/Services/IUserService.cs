using System;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.Repositories;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task LoginAsync(LoginModel loginModel);
    }
    
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task LoginAsync(LoginModel loginModel)
        {
            var user = (await _userRepository.GetAsync(u => u.Email == loginModel.Email)).SingleOrDefault();
            
            if (user == null || user.Password != loginModel.Password)
                throw new Exception();
        }
    }
}