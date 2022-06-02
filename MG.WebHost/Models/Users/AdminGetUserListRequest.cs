using MG.WebHost.Entities.Enums;

namespace MG.WebHost.Models.Users;

public record AdminGetUserListRequest : FilterPageRequest
{
    public UserType? UserType { get; set; }
}