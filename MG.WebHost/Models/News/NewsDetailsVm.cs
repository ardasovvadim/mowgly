namespace MG.WebHost.Models.News;

public record NewsDetailsVm : NewsVm
{
    public string Blocks { get; set; }
    public Guid? TournamentId { get; set; }
}