namespace WebApi.Entities.Interfaces
{
    public interface ILoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string JwtToken { get; set; }
    }
}