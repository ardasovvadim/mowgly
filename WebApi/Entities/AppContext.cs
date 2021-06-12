using Microsoft.EntityFrameworkCore;

namespace WebApi.Entities
{
    public class AppContext : DbContext
    {
        public DbSet<Location> Locations { get; set; }
        public DbSet<UserRequest> UserRequests { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        
        public AppContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=helloappdb;Trusted_Connection=True;");
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=mowgly_master;Trusted_Connection=True;");
            // base.OnConfiguring(optionsBuilder);
        }
    }
}