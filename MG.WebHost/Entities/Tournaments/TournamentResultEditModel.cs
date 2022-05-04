using System;
using MG.WebHost.Models;

namespace MG.WebHost.Entities.Tournaments;

public record TournamentResultEditModel
{
    public Guid? Id { get; set; }
    public IdName Student { get; set; }
    public string Place { get; set; }
    public string Score { get; set; }
    public string AdditionalInfo { get; set; }
    public string Awards { get; set; }
}