namespace MG.WebHost.Contracts.Users;

public class InviteMasterDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public bool SendEmail { get; set; }
}