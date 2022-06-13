namespace MG.WebHost.Tasks;

public interface IStartupTask
{
    public Task ExecuteAsync();
}