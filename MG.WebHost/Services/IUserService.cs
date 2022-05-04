namespace MG.WebHost.Services
{
    public interface IUserService
    {
        // Task LoginAsync(LoginModel loginModel);
    }
    
    public class UserService : IUserService
    {
        // private readonly IRepository<User> _userRepository;
        //
        // public UserService(IRepository<User> userRepository)
        // {
        //     _userRepository = userRepository;
        // }
        //
        // public async Task LoginAsync(LoginModel loginModel)
        // {
        //     var user = (await _userRepository.GetAsync(u => u.Email == loginModel.Email)).SingleOrDefault();
        //     
        //     if (user == null || user.Password != loginModel.Password)
        //         throw new Exception();
        // }
    }
}