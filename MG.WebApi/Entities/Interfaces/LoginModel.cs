namespace MG.WebAPi.Entities.Interfaces
{
    public abstract class LoginModel : BaseEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}