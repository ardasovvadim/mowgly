namespace MG.WebHost.Models.Users;

public class UserRegistrationDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}