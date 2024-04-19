using MG.WebHost.Contracts;
using MG.WebHost.Contracts.Emails;
using MG.WebHost.Contracts.Images;
using MG.WebHost.Contracts.Locations;
using MG.WebHost.Contracts.Masters;
using MG.WebHost.Contracts.News;
using MG.WebHost.Contracts.Notifications;
using MG.WebHost.Contracts.Registrations;
using MG.WebHost.Contracts.StartupTasks;
using MG.WebHost.Contracts.Tasks;
using MG.WebHost.Contracts.Telegram;
using MG.WebHost.Contracts.Timetalbes;
using MG.WebHost.Contracts.Tournaments;
using MG.WebHost.Contracts.Users;
using MG.WebHost.Repositories;
using MG.WebHost.Security;
using MG.WebHost.Services;
using MG.WebHost.Services.BackgroundServices;
using MG.WebHost.Services.Emails;
using MG.WebHost.Services.Images;
using MG.WebHost.Services.Locations;
using MG.WebHost.Services.Masters;
using MG.WebHost.Services.News;
using MG.WebHost.Services.Notifications;
using MG.WebHost.Services.OneTimeTasks;
using MG.WebHost.Services.Registrations;
using MG.WebHost.Services.StartupTasks;
using MG.WebHost.Services.Tasks;
using MG.WebHost.Services.Telegram;
using MG.WebHost.Services.Timetables;
using MG.WebHost.Services.Tournaments;
using MG.WebHost.Services.Users;
using MG.WebHost.Settings;
using MG.WebHost.Utils;
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
            services.AddScoped<IRegistrationService, RegistrationService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<ITournamentService, TournamentService>();
            services.AddScoped<INewsService, NewsService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<ILazyProvider, LazyProvider>();
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
            services.AddTransient<IEmailUtils, EmailUtils>();
            services.AddTransient<IDirectoryUtils, DirectoryUtils>();
            services.AddTransient<ILinkHelper, LinkHelper>();
            services.AddTransient<JwtHandler>();
            services.AddTransient<CacheUtils>();
            services.AddTransient<UserPermissionCache>();
            
            // Middleware
            services.AddTransient<PermissionsMiddleware>();

            services.Configure<AppSettings>(configuration.GetSection(AppSettings.SettingsSection));
            services.Configure<SmtpSettings>(configuration.GetSection(SmtpSettings.SettingsSection));
            services.Configure<DbInitializerSettings>(configuration.GetSection(DbInitializerSettings.Name));
            services.Configure<GoogleSettings>(configuration.GetSection(GoogleSettings.Name));
            services.Configure<TelegramSettings>(configuration.GetSection(TelegramSettings.Name));
            services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.Name));

            services.Configure<TelegramTokenProviderOptions>(o => o.TokenLifespan = TimeSpan.FromMinutes(5));

            // Tasks
            services.AddStartupTask<DbInitializationStartupTask>();
            services.AddStartupTask<MoveMasterCardImageToUserAvatarOneTimeStartupTask>();

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