using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Entities.Users;

namespace MG.WebHost.Entities;

public class Permission : BaseEntity
{
    public string Name { get; set; }
    
    // TODO uncomment when invite permission is implemented and migration is ready
    // public string Description { get; set; }

    public virtual ICollection<User> Users { get; set; } = new HashSet<User>();
    public virtual ICollection<Role> Roles { get; set; } = new HashSet<Role>();
}