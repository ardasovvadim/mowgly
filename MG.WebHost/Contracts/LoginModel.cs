using MG.WebHost.Entities.Enums;

namespace MG.WebHost.Contracts
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public UserType UserTypes { get; set; }
    }
}