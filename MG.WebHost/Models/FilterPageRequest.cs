namespace MG.WebHost.Models;

public record FilterPageRequest : PageRequest
{
    public string FilterText { get; set; }
}