using WebApi.Entities.Enums;

namespace WebApi.Models
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public UserType UserTypes { get; set; }
    }
}