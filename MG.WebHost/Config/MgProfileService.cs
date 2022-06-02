using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Users;
using Microsoft.AspNetCore.Identity;
using static System.Enum;

namespace MG.WebHost.Config;

public class MgProfileService : IProfileService
{
    public MgProfileService(UserManager<User> userManager)
    {
        UserManager = userManager;
    }

    private UserManager<User> UserManager { get; }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await UserManager.GetUserAsync(context.Subject);
        context.IssuedClaims.AddRange(GetValues<UserType>().Where(v => (user.UserTypes & v) == v).Select(v => new Claim(ClaimTypes.Role, v.ToString("G"))).ToList());
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        var user = await UserManager.GetUserAsync(context.Subject);
        context.IsActive = user?.Deleted == false;
    }
}