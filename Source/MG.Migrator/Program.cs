using MG.Migrator.Workers;
using MG.WebHost.Database;
using MG.WebHost.Settings;
using Microsoft.EntityFrameworkCore;

var host = Host.CreateDefaultBuilder()
    .ConfigureServices((builder, services) =>
    {
        // todo
        var connectionString = builder.Configuration["DefaultConnection"];
        var isDevelopment = builder.HostingEnvironment.IsDevelopment();
        
        services.AddDbContext<MgContext>(options =>
        {
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            if (isDevelopment)
                options
                    .LogTo(Console.WriteLine, LogLevel.Information)
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors();
        });

        services.Configure<DbInitializerSettings>(builder.Configuration.GetSection(DbInitializerSettings.Name));

        services.AddHostedService<DbMigrationWorker>();

    })
    .Build();

await host.RunAsync();