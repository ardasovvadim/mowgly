using Serilog;
using Serilog.Events;

namespace MG.WebHost
{
    public static class Program
    {
        public static async Task Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .ConfigureLogger()
                .CreateBootstrapLogger();
            
            await Startup
                .CreateWebAppBuilder(args)
                .Build()
                .Configure()
                .RunWithTasksAsync();
        }
    }
}