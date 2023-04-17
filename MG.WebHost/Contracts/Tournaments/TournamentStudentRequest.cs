namespace MG.WebHost.Contracts.Tournaments;

public class TournamentStudentRequest
{
    public IEnumerable<Guid> Except { get; set; }
    public string FilterText { get; set; }
}