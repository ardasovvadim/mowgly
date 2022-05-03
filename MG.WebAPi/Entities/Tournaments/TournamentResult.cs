using System;
using MG.WebAPi.Entities.Interfaces;
using MG.WebApi.Entities.Users;

namespace MG.WebApi.Entities.Tournaments;

public class TournamentResult : BaseEntity
{
    public string Place { get; set; }
    public string Score { get; set; }
    public string AdditionalInfo { get; set; }
    public string Awards { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid TournamentId { get; set; }
    public Tournament Tournament { get; set; }
}