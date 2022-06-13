namespace MG.WebHost.Models.Auth;

public class LoginResponseDto
{
    public bool IsSuccess { get; set; }
    public string ErrorMessage { get; set; }
    public string Token { get; set; }
}