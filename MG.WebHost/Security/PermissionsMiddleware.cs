using System.Security.Claims;
using MG.WebHost.Config;
using MG.WebHost.Utils;

namespace MG.WebHost.Security;

public class PermissionsMiddleware : IMiddleware
{
    public PermissionsMiddleware(UserPermissionCache cache)
    {
        Cache = cache;
    }

    private UserPermissionCache Cache { get; }
    
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (context.User.Identity is ClaimsIdentity identity)
            await PopulatePermissionsAsync(identity);

        await next(context);
    }

    private async Task PopulatePermissionsAsync(ClaimsIdentity identity)
    {
        var userId = identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userId == null || !Guid.TryParse(userId, out var id))
            return;

        var permissions = (await Cache.GetAsync(id)).ToList();

        if (permissions.Any())
            identity.AddClaims(permissions.Select(p => new Claim(MgClaim.Permission, p)));
    }
}