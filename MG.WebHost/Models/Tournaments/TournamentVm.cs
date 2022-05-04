using System;
using System.Collections.Generic;

namespace MG.WebHost.Models.Tournaments;

public record TournamentVm : BaseDto
{
    public string Name { get; set; }
    public DateTime? ActionDate { get; set; }
    public IEnumerable<TournamentResultVm> Results { get; set; }
}