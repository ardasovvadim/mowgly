namespace MG.WebHost.Contracts.Events;

public record EventListRequest : PageRequest
{
    public string FilterText { get; set; }
    public DateTime? ActionDate { get; set; }
}