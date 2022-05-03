using System;
using System.Collections.Generic;
using MG.WebAPi.Entities.Interfaces;

namespace MG.WebApi.Entities.Tournaments;

public class Tournament : BaseEntity
{
    public string Name { get; set; }
    public DateTime? ActionDate { get; set; }

    public ICollection<TournamentResult> Results { get; set; }
}