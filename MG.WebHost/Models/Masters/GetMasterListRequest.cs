namespace MG.WebHost.Models.Masters;

public record GetMasterListRequest : PageRequest
{
    public string FilterText { get; set; }
    public Guid? SectionId { get; set; }
}