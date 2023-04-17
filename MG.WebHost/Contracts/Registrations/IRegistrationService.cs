namespace MG.WebHost.Contracts.Registrations
{
    public interface IRegistrationService
    {
        Task RegistrationAsync(OrderDto dto);
        Task MarkAsProcessedAsync(Guid id);
    }
}