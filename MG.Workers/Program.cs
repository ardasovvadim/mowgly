using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MG.WebAPi.Config;
using MG.WebAPi.Repositories;
using MG.WebAPi.Services;
using MG.Workers.ClientWorkers;
using MG.Workers.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MG.Workers
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureMgAppConfiguration(args)
                .ConfigureServices((hostContext, services) =>
                {
                    // Business and data
                    services.ConfigureBusinessServices(hostContext.Configuration);
                    
                    // Config
                    var workerSettingsSection = hostContext.Configuration.GetSection(WorkerSettings.SettingsSection);
                    var smtpSettingsSection = workerSettingsSection.GetChildren().FirstOrDefault(s => s.Key == SmtpSettings.SettingsSection);
                    
                    services.Configure<WorkerSettings>(workerSettingsSection);
                    services.Configure<SmtpSettings>(smtpSettingsSection);

                    var workerSettings = new WorkerSettings();
                    workerSettingsSection.Bind(workerSettings);

                    if (workerSettings.RunSmtpWorker)
                    {
                        services.AddHostedService<BaseScopedServiceHostedService>();
                        services.AddScoped<IScopedWorker, EmailWorker>();
                    }
                });
    }
}