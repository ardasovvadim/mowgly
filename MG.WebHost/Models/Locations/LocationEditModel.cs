namespace MG.WebHost.Models.Locations;

public record LocationEditModel : BaseDto
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string GoogleMapsLink { get; set; }
    public string GoogleMapsEmbeddedLink { get; set; }
    public IEnumerable<IdName> Sections { get; set; }
}