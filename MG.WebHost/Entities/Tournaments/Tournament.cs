using System;
using System.Collections.Generic;
using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Tournaments;

public class Tournament : BaseEntity
{
    public string Name { get; set; }
    public DateTime? ActionDate { get; set; }

    public ICollection<TournamentResult> Results { get; set; }
}