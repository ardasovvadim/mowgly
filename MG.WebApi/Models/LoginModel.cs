using MG.WebAPi.Entities.Enums;

namespace MG.WebAPi.Models
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public UserType UserTypes { get; set; }
    }
}