namespace MG.WebHost.Contracts.StartupTasks;

public interface IStartupTask
{
    public Task ExecuteAsync();
}