namespace MG.WebHost.Contracts;

public interface ILazyProvider
{
    T GetRequiredService<T>() where T : class;
    T ProvideRequired<T>(Func<T> factory) where T : class;
}