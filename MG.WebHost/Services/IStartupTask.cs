using MG.WebHost.Database;
using MG.WebHost.Entities.Users;
using MG.WebHost.MockData;
using MG.WebHost.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MG.WebHost.Services;

public interface IStartupTask
{
    public Task ExecuteAsync();
}

public class DbInitialization : IStartupTask
{
    public DbInitialization(IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
    }

    private IServiceProvider ServiceProvider { get; }
    
    public async Task ExecuteAsync()
    {
        await using var scope = ServiceProvider.CreateAsyncScope();
        var serviceProvider = scope.ServiceProvider;
        var settings = serviceProvider.GetRequiredService<IOptions<DbInitializerSettings>>().Value;
        var logger = serviceProvider.GetRequiredService<ILogger<DbInitialization>>();
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
        
        if (settings.SeedData)
        {
            logger.LogInformation("Seeding mock data to DB...");
            await TestDbData.Initialize(context, 
                serviceProvider.GetRequiredService<UserManager<User>>(),
                serviceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>()
            );
        }
    }
}