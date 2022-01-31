using System.Threading;
using System.Threading.Tasks;

namespace MG.Workers
{
    public interface IScopedWorker
    {
        Task StartAsync(CancellationToken cancellationToken);
        Task StopAsync(CancellationToken cancellationToken);
        Task ExecuteAsync(CancellationToken stoppingToken);
    }
}