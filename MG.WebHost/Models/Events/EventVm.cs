using System;

namespace MG.WebHost.Models.Events;

public record EventVm
{
    public Guid Id { get; set; }
    public DateTime ActionDate { get; set; }
    public string TournamentName { get; set; }
    public string Address { get; set; }
    public string GoogleMapLink { get; set; }
    public string Participants { get; set; }
}