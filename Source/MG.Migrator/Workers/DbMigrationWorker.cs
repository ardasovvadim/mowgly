using MG.Migrator.Settings;
using MG.WebHost.Database;
using MG.WebHost.MockData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MG.Migrator.Workers;

public class DbMigrationWorker : IHostedService
{
    private IServiceProvider ServiceProvider { get; }
    
    public DbMigrationWorker(IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
    }
    
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await using var scope = ServiceProvider.CreateAsyncScope();
        var serviceProvider = scope.ServiceProvider;
        var logger = serviceProvider.GetRequiredService<ILogger<DbMigrationWorker>>();
        var settings = serviceProvider.GetRequiredService<IOptions<ServiceSettings>>().Value;
        
        try
        {
            await using var context = serviceProvider.GetRequiredService<MgContext>();

            if (settings.RecreateDb)
            {
                logger.LogInformation("Db will be recreated");

                
                logger.LogInformation("Deleting DB...");
                await context.Database.EnsureDeletedAsync(cancellationToken);

                logger.LogInformation("Creating DB...");
                await context.Database.EnsureCreatedAsync(cancellationToken);
            }

            if (settings.MigrateDb)
            {
                logger.LogInformation("Migrating DB...");
                await context.Database.MigrateAsync(cancellationToken);
            }

            if (settings.SeedData)
            {
                logger.LogInformation("Seeding mock data to DB...");
                TestDbData.Initialize(context);
            }
        }
        catch (Exception e)
        {
            logger.LogError(message: "Something went wrong during migration db", exception: e);
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}