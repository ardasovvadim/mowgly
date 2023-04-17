using MG.WebHost.Entities.Enums;

namespace MG.WebHost.Contracts.Users;

public record AdminUserVm : AdminBaseDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public UserType UserTypes { get; set; }
    public DateTime? Birthday { get; set; }
    public IEnumerable<GeneralSettingVm> Profiles { get; set; }
}