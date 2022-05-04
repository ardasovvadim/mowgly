namespace MG.WebHost.Models.Options;

public record OptionsRequest
{
    public bool Cities { get; set; }
    public bool Locations { get; set; }
    public bool Sections { get; set; }
}