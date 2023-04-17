namespace MG.WebHost.Contracts.Locations;

public record GetAdminLocationVmRequest : FilterPageRequest
{
    public string FilterCity { get; set; }
}