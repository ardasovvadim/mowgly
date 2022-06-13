using MG.WebHost.Entities.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace MG.WebHost.Entities;

public class UserLogin : IdentityUserLogin<Guid>, IBaseEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public bool Deleted { get; set; }
}