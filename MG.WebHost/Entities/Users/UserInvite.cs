using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Users;

public class UserInvite : BaseEntity
{
    public string Name { get; set; }
    public string Email { get; set; }
    public bool SendEmail { get; set; }
    public DateTime Expiration { get; set; }
}