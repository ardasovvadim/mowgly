using System;
using System.Collections.Generic;

namespace MG.WebHost.Models.Tournaments;

public class TournamentStudentRequest
{
    public IEnumerable<Guid> Except { get; set; }
    public string FilterText { get; set; }
}