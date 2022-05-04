using MG.WebHost.Entities.Enums;

namespace MG.WebHost.Models
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public UserType UserTypes { get; set; }
    }
}