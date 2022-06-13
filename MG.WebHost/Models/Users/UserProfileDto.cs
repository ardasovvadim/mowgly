namespace MG.WebHost.Models.Users;

public class UserProfileDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public DateTime? Birthday { get; set; }
    public string Name { get; set; }
    
    public IEnumerable<string> Roles { get; set; }
    public IEnumerable<string> Permissions { get; set; }
    public IEnumerable<GeneralSettingVm> Profiles { get; set; }
}