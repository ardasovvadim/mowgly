using System;
using MG.WebAPi.Entities.Interfaces;

namespace MG.WebApi.Entities.Events;

public class Event : BaseEntity
{
    public DateTime ActionDate { get; set; }
    public string TournamentName { get; set; }
    public string NormalizedTournamentName { get; set; }
    public string Address { get; set; }
    public string GoogleMapLink { get; set; }
    public string Participants { get; set; }
}