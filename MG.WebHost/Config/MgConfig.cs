using AutoMapper;
using MG.WebHost.JwtFeatures;
using MG.WebHost.Repositories;
using MG.WebHost.Security;
using MG.WebHost.Services;
using MG.WebHost.Settings;
using MG.WebHost.Tasks;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Identity.UI.Services;
using Telegram.Bot;

namespace MG.WebHost.Config
{
    public static class MgConfig
    {
        public static IServiceCollection ConfigureBusinessServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped(typeof(IService<,>), typeof(Service<,>));
            services.AddScoped(typeof(IBaseService), typeof(BaseService));
            services.AddAutoMapper(typeof(MgMapProfile));
            
            // Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITimetableRecordService, TimetableRecordService>();
            services.AddScoped<IMasterService, MasterService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IEmailSender, EmailService>();
            services.AddScoped<IRegistrationService, RegistrationService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<ITournamentService, TournamentService>();
            services.AddScoped<INewsService, NewsService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<ITelegramService, TelegramService>();
            services.AddScoped<ITelegramBotClient, TelegramBotClient>(sp =>
            {
                var secret = configuration.GetSection(TelegramSettings.Name)["Secret"];
                return new TelegramBotClient(secret);
            });
            services.AddScoped<INotifierService, NotifierService>();

            // Hosted Services
            services.AddHostedService<QueuedHostedService>();
            services.AddSingleton<IBackgroundTaskQueue>(_ => new BackgroundTaskQueue(50));

            // Utils
            services.AddSingleton<IEmailUtils, EmailUtils>();
            services.AddSingleton<IDirectoryUtils, DirectoryUtils>();
            services.AddScoped<JwtHandler>();
            services.AddScoped<CacheUtils>();
            services.AddScoped<UserPermissionCache>();
            
            // Middleware
            services.AddTransient<PermissionsMiddleware>();

            services.Configure<AppSettings>(configuration.GetSection(AppSettings.SettingsSection));
            services.Configure<SmtpSettings>(configuration.GetSection(SmtpSettings.SettingsSection));
            services.Configure<DbInitializerSettings>(configuration.GetSection(DbInitializerSettings.Name));
            services.Configure<GoogleSettings>(configuration.GetSection(GoogleSettings.Name));
            services.Configure<TelegramSettings>(configuration.GetSection(TelegramSettings.Name));

            services.Configure<TelegramTokenProviderOptions>(o => o.TokenLifespan = TimeSpan.FromMinutes(5));

            // Tasks
            services.AddStartupTask<DbInitialization>();

            return services;
        }
        
        private static IServiceCollection AddStartupTask<T>(this IServiceCollection serviceCollection)
            where T : class, IStartupTask
        {
            return serviceCollection.AddTransient<IStartupTask, T>();
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