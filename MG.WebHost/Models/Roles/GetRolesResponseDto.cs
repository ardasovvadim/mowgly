namespace MG.WebHost.Models.Roles;

public class GetRolesResponseDto
{
    public IEnumerable<RoleDto> Roles { get; set; }
    public IEnumerable<IdName> Permissions { get; set; }
}

public class RoleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<Guid> Permissions { get; set; }
}

public class EditRolesRequestDto
{
    public IEnumerable<RoleDto> Roles { get; set; }
}