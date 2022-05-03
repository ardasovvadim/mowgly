using System;

namespace MG.WebApi.Entities.Tournaments;

public class TournamentEditModel
{
    public Guid? Id { get; set; }
    public string Name { get; set; }
    public DateTime? ActionDate { get; set; }
}