using Duende.IdentityServer.EntityFramework.Options;
using MG.WebHost.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MG.WebHost.Database;

public partial class MgContext : MgApiAuthorizationDbContext<User, IdentityRole<Guid>, Guid>
{
    public MgContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
    }
}