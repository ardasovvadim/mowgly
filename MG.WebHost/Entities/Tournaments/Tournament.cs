using System.Diagnostics.CodeAnalysis;
using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Tournaments;

public class Tournament : BaseEntity
{
    public Tournament()
    {
        
    }
    
    public Tournament(string name)
    {
        SetName(name);
    }

    public string Name { get; protected set; }
    
    public string NormalizedName { get; protected set; }
    
    public string Address { get; set; }
    
    public string GoogleMapLink { get; set; }
    
    public string Participants { get; set; }
    public DateTime? ActionDate { get; set; }


    public void SetName([NotNull] string name)
    {
        Name = name;
        NormalizedName = name.ToUpper();
    }

    public ICollection<TournamentResult> Results { get; set; }

    public virtual News.News News { get; set; }
}