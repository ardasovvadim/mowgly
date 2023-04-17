namespace MG.WebHost.Contracts.Tournaments;

public record TournamentVm : BaseDto
{
    public string Name { get; set; }
    public DateTime? ActionDate { get; set; }
    public IEnumerable<TournamentResultVm> Results { get; set; }
}