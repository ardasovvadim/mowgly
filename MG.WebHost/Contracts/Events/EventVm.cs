namespace MG.WebHost.Contracts.Events;

public record EventVm : BaseDto
{
    public DateTime ActionDate { get; set; }
    public Guid? NewsId { get; set; }
    public string TournamentName { get; set; }
    public string Address { get; set; }
    public string GoogleMapLink { get; set; }
    public string Participants { get; set; }
}