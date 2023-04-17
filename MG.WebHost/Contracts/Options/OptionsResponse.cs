namespace MG.WebHost.Contracts.Options;

public class OptionsResponse
{
    public IEnumerable<IdName> Locations { get; set; }
    public IEnumerable<IdName> Sections { get; set; }
    public IEnumerable<string> Cities { get; set; }
    public IEnumerable<LocationOption> Locations2 { get; set; }
}

public class LocationOption : IdName
{
    public IEnumerable<IdName> Sections { get; set; }
}