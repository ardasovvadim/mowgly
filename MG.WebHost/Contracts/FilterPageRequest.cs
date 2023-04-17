namespace MG.WebHost.Contracts;

public record FilterPageRequest : PageRequest
{
    public string FilterText { get; set; }
}