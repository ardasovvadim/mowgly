namespace MG.WebHost.Settings;

public class JwtSettings
{
    public const string Name = "JwtSettings";
    public double RefreshTokenExpiryInDays { get; set; }
}