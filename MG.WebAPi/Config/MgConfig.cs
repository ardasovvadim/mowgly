using System;
using System.IO;
using MG.WebAPi.Database;
using MG.WebAPi.Maps;
using MG.WebAPi.Repositories;
using MG.WebAPi.Services;
using MG.WebAPi.Settings;
using MG.WebAPi.Utils;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MG.WebAPi.Config
{
    public static class MgConfig
    {
        public static IServiceCollection ConfigureBusinessServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped(typeof(IService<,>), typeof(Service<,>));
            services.AddAutoMapper(typeof(MgProfile));
            services.AddDbContext<MgContext>();
            
            // Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITimetableRecordService, TimetableRecordService>();
            services.AddScoped<IMasterService, MasterService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IRegistrationService, RegistrationService>();
            services.AddScoped<IImageService, ImageService>();
            
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