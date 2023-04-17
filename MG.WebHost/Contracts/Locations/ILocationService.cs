namespace MG.WebHost.Contracts.Locations;

public interface ILocationService
{
    Task<LocationEditModel> Save(LocationEditModel request);
}