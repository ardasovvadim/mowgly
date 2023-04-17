namespace MG.WebHost.Contracts.Options;

public record OptionsRequest
{
    public bool Cities { get; set; }
    public bool Locations { get; set; }
    public bool Sections { get; set; }
    public bool LocationSections { get; set; }
}