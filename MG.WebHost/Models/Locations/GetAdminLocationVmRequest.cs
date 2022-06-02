namespace MG.WebHost.Models.Locations;

public record GetAdminLocationVmRequest : FilterPageRequest
{
    public string FilterCity { get; set; }
}