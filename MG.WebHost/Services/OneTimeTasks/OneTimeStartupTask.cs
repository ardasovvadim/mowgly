using MG.WebHost.Contracts;
using MG.WebHost.Contracts.StartupTasks;
using MG.WebHost.Entities;
using MG.WebHost.Repositories;

namespace MG.WebHost.Services.OneTimeTasks;

public abstract class OneTimeStartupTask : IStartupTask
{
    private readonly IServiceProvider _serviceProvider;
    protected IServiceProvider ServiceProvider;
    protected ILazyProvider LazyProvider => ServiceProvider.GetRequiredService<ILazyProvider>();
    protected ILogger Logger => LazyProvider.ProvideRequired(() => ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger(GetType()));
    protected IRepository<OneTimeTask> SettingRepository => LazyProvider.GetRequiredService<IRepository<OneTimeTask>>();

    protected OneTimeStartupTask(IServiceProvider serviceProvider)
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
        
        Logger.LogInformation("Running one time task {id}", Task);

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
        
        Logger.LogInformation("One time task {id} successfully executed", Task);
    }

    protected abstract Task ExecuteOnce();
}