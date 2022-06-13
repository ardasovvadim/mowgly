using MG.WebHost.Entities.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace MG.WebHost.Entities;

public class Role : IdentityRole<Guid>, IBaseEntity
{
    public Role()
    {
    }

    public Role(string roleName) : base(roleName)
    {
    }

    public virtual ICollection<Permission> Permissions { get; set; } = new HashSet<Permission>();
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public bool Deleted { get; set; }
}