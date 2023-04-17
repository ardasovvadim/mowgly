using System.Collections.Concurrent;
using MG.WebHost.Contracts;

namespace MG.WebHost.Services;

public class LazyProvider : ILazyProvider
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ConcurrentDictionary<Type, object> _bag = new();

    public LazyProvider(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public T GetRequiredService<T>() where T : class
    {
        var type = typeof(T);

        if (_bag.GetValueOrDefault(type) is T impl)
            return impl;

        impl = _serviceProvider.GetRequiredService<T>();
        _bag[type] = impl;

        return impl;
    }

    public T ProvideRequired<T>(Func<T> factory) where T : class
    {
        var type = typeof(T);
        
        if (_bag.GetValueOrDefault(type) is T impl)
            return impl;

        impl = factory();
        _bag[type] = impl;

        return impl;
    }

}