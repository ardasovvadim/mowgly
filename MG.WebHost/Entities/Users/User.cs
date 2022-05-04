using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Entities.Sections;
using Microsoft.AspNetCore.Identity;

namespace MG.WebHost.Entities.Users;

public class User : IdentityUser<Guid>, IBaseEntity
{
    public User()
    {
        Id = Guid.NewGuid();
        SecurityStamp = Guid.NewGuid().ToString();
    }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedDate { get; set; }
    public bool Deleted { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }

    public string NormalizedName { get; set; }
        
    public UserType UserTypes { get; set; }
    public DateTime? Birthday { get; set; }

    public virtual ICollection<UserProfile> Profiles { get; set; }
    public virtual ICollection<Section> Sections { get; set; }
    public virtual ICollection<TimetableRecord> TimetableRecords { get; set; }
}