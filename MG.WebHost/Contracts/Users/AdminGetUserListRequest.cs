using MG.WebHost.Entities.Enums;

namespace MG.WebHost.Contracts.Users;

public record AdminGetUserListRequest : FilterPageRequest
{
    public UserType? UserType { get; set; }
}