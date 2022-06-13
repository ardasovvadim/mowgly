using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

namespace MG.WebHost.Utils;

public class CacheUtils
{
    private IDistributedCache Cache { get; }

    public CacheUtils(IDistributedCache cache)
    {
        Cache = cache;
    }

    public async Task<TClass> GetAsync<TClass>(string key) where TClass : class
    {
        var result = await Cache.GetAsync(key);

        if (result == null)
            return null;

        using var ms = new MemoryStream(result);
        return await JsonSerializer.DeserializeAsync<TClass>(ms);
    }

    public async Task SetAsync<TClass>(TClass obj, string key, DistributedCacheEntryOptions options) where TClass : class
    {
        var bytes = JsonSerializer.SerializeToUtf8Bytes(obj);
        await Cache.SetAsync(key, bytes, options);
    }
    
    public async Task SetAsync<TClass>(TClass obj, string key) where TClass : class
    {
        var bytes = JsonSerializer.SerializeToUtf8Bytes(obj);
        await Cache.SetAsync(key, bytes);
    }

    public async Task<TClass> GetOrSetAsync<TClass>(string key, Func<Task<TClass>> factory, DistributedCacheEntryOptions options) where TClass : class
    {
        var result = await GetAsync<TClass>(key);
        if (result != null)
            return result;

        result = await factory();
        await SetAsync(result, key, options);
        return result;
    }

    public async Task RemoveAsync(string key)
    {
        await Cache.RemoveAsync(key);
    }
}