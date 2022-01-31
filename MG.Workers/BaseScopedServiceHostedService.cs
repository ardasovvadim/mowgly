using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MG.Workers
{
    public class BaseScopedServiceHostedService: BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private IServiceScope _serviceScope;
        private IScopedWorker _worker;

        public BaseScopedServiceHostedService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            return SaveAction(async () =>
            {
                _serviceScope = _serviceProvider.CreateScope();
                _worker = _serviceScope.ServiceProvider.GetService<IScopedWorker>();
                if (_worker != null)
                    await _worker?.StartAsync(cancellationToken);

                await base.StartAsync(cancellationToken);
            });
        }

        private Task SaveAction(Func<Task> action)
        {
            try
            {
                return action();
            }
            catch (Exception)
            {
                DisposeAndReset();
            }
            
            return Task.CompletedTask;
        }

        private void DisposeAndReset()
        {
            _serviceScope?.Dispose();
            _serviceScope = null;
            _worker = null;
        }

        public override Task StopAsync(CancellationToken cancellationToken)
        {
            return SaveAction(async () =>
            {
                if (_worker != null)
                    await _worker.StopAsync(cancellationToken);

                await base.StopAsync(cancellationToken);
            });
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            return SaveAction(async () =>
            {
                if (_worker != null)
                    await _worker.ExecuteAsync(stoppingToken);
            });
        }
    }
}