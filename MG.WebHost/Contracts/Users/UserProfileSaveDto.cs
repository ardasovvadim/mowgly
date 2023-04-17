namespace MG.WebHost.Contracts.Users;

public class UserProfileSaveDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }
    public string Email { get; set; }
    public DateTime? Birthday { get; set; }
    public string PhoneNumber { get; set; }
    public IEnumerable<GeneralSettingVm> Profiles { get; set; }
}