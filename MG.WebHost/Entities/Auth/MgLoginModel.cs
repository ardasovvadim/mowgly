using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Auth;

public class MgLoginModel : BaseEntity
{
    public string RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public Guid UserId { get; set; }
}