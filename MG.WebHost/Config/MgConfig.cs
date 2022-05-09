using MG.WebHost.Maps;
using MG.WebHost.Repositories;
using MG.WebHost.Services;
using MG.WebHost.Settings;
using MG.WebHost.Utils;

namespace MG.WebHost.Config
{
    public static class MgConfig
    {
        public static IServiceCollection ConfigureBusinessServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped(typeof(IService<,>), typeof(Service<,>));
            services.AddAutoMapper(typeof(MgProfile));
            
            // Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITimetableRecordService, TimetableRecordService>();
            services.AddScoped<IMasterService, MasterService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IRegistrationService, RegistrationService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<ITournamentService, TournamentService>();
            services.AddScoped<INewsService, NewsService>();

            // Utils
            services.AddSingleton<IEmailUtils, EmailUtils>();
            services.AddSingleton<IDirectoryUtils, DirectoryUtils>();

            services.Configure<AppSettings>(configuration.GetSection(AppSettings.SettingsSection));

            return services;
        }
        
        public static IHostBuilder ConfigureMgAppConfiguration(this IHostBuilder app, string[] args) => app.ConfigureAppConfiguration((context, config) =>
        {
            var env = context.HostingEnvironment;
            var rootFolderPath = Path.Combine(Directory.GetParent(env.ContentRootPath)?.FullName!, "Source");
            var appSettingsFilePath = Path.Combine(rootFolderPath, "appsettings.json");
            var appSettingsDevFilePath = Path.Combine(rootFolderPath, $"appsettings.{env.EnvironmentName}.json");
            config.AddJsonFile(appSettingsFilePath, optional: false, reloadOnChange: true);
            config.AddJsonFile(appSettingsDevFilePath, optional: true, reloadOnChange: true);
            config.AddEnvironmentVariables();

            if (args != null)
                config.AddCommandLine(args);
        });
    }
}