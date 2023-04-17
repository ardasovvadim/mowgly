using MG.WebHost.Contracts.Users;
using MG.WebHost.Entities.Users;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Distributed;

namespace MG.WebHost.Utils;

public class UserPermissionCache
{
    private readonly UserManager<User> _userManager;

    public UserPermissionCache(IUserService userService, CacheUtils cache, UserManager<User> userManager)
    {
        UserService = userService;
        Cache = cache;
        _userManager = userManager;
    }

    private CacheUtils Cache { get; }
    private const string CacheKey = "Permissions_";
    private const string CacheKeys = "Permissions";
    private IUserService UserService { get; }
    
    public async Task<IEnumerable<string>> GetAsync(Guid userId)
    {
        var key = CacheKey + userId;
        var permissions = (await Cache.GetOrSetAsync(
                key,
                async () => await UserService.GetPermissionsAsync(userId),
                new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1) }))
            .ToList();
        await SetKeyAsync(key);

        return permissions;
    }
    
    public async Task ClearCacheAsync(Guid userId)
    {
        var key = CacheKey + userId;
        await Cache.RemoveAsync(key);
    }

    public async Task ClearCacheAsync()
    {
        var keys = await Cache.GetAsync<IEnumerable<string>>(CacheKeys);
        
        if (keys?.Any() == true)
            foreach (var key in keys)
                await Cache.RemoveAsync(key);

        await Cache.RemoveAsync(CacheKeys);
    }

    private async Task SetKeyAsync(string key)
    {
        var keys = await Cache.GetAsync<IEnumerable<string>>(CacheKeys);

        if (keys == null)
        {
            await Cache.SetAsync(new[] { key }, CacheKeys);
            return;
        }

        var newKeys = new List<string>(keys) { key };
        await Cache.SetAsync(newKeys, CacheKeys);
    }
}