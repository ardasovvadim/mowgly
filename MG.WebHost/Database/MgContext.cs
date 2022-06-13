using MG.WebHost.Entities;
using MG.WebHost.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Database;

public partial class MgContext : IdentityDbContext<User, Role, Guid, IdentityUserClaim<Guid>, IdentityUserRole<Guid>, UserLogin, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
{
    public MgContext(DbContextOptions options) : base(options)
    {
    }
}