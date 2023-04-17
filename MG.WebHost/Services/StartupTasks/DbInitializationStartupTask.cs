using MG.WebHost.Contracts.StartupTasks;
using MG.WebHost.Database;
using MG.WebHost.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MG.WebHost.Services.StartupTasks;

public class DbInitializationStartupTask : IStartupTask
{
    public DbInitializationStartupTask(IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
    }

    private IServiceProvider ServiceProvider { get; }
    
    public async Task ExecuteAsync()
    {
        await using var scope = ServiceProvider.CreateAsyncScope();
        var serviceProvider = scope.ServiceProvider;
        var settings = serviceProvider.GetRequiredService<IOptions<DbInitializerSettings>>().Value;
        var logger = serviceProvider.GetRequiredService<ILogger<DbInitializationStartupTask>>();
        await using var context = serviceProvider.GetRequiredService<MgContext>();
        
        if (settings.RecreateDb)
        {
            logger.LogInformation("Db will be recreated");
        
                
            logger.LogInformation("Deleting DB...");
            await context.Database.EnsureDeletedAsync();
        
            logger.LogInformation("Creating DB...");
            await context.Database.EnsureCreatedAsync();
        }
        
        if (settings.MigrateDb)
        {
            logger.LogInformation("Migrating DB...");
            await context.Database.MigrateAsync();
        }
    }
}