using MG.WebHost.Entities;
using MG.WebHost.Repositories;
using MG.WebHost.Services;

namespace MG.WebHost.Tasks;

public abstract class OnceStartupTask : IStartupTask
{
    private readonly IServiceProvider _serviceProvider;
    protected IServiceProvider ServiceProvider;
    protected ILazyProvider LazyProvider => ServiceProvider.GetRequiredService<ILazyProvider>();
    protected ILogger Logger => LazyProvider.ProvideRequired(() => ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger(GetType()));
    protected IRepository<OneTimeTask> SettingRepository => LazyProvider.GetRequiredService<IRepository<OneTimeTask>>();

    protected OnceStartupTask(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected abstract string Task { get; }

    public async Task ExecuteAsync()
    {
        await using var scope = _serviceProvider.CreateAsyncScope();
        ServiceProvider = scope.ServiceProvider;
        
        var isExecutedPrev = await SettingRepository.IsExistsAsync(s => s.Task == Task);
        
        if (isExecutedPrev)
            return;

        try
        {
            await ExecuteOnce();
        }
        catch (Exception e)
        {
            Logger.LogError(e, "Something went wrong during one type task running {id}", Task);
            return;
        }

        var setting = new OneTimeTask(Task);
        
        await SettingRepository.InsertAsync(setting);
        await SettingRepository.SaveChangesAsync();
    }
    
    public abstract Task ExecuteOnce();
    
}