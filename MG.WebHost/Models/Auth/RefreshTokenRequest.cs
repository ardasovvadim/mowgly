namespace MG.WebHost.Models.Auth;

public class RefreshTokenRequest
{
    public string RefreshToken { get; set; }
    public string AccessToken { get; set; }
}