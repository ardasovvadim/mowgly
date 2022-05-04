using MG.WebHost.Entities;
using MG.WebHost.Entities.Emails;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Events;
using MG.WebHost.Entities.Images;
using MG.WebHost.Entities.News;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Tournaments;
using MG.WebHost.Entities.Users;
using MG.WebHost.Utils;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Database
{
    public partial class MgContext
    {
        public DbSet<Location> Locations { get; set; }
        public DbSet<UserRequest> UserRequests { get; set; }
        public DbSet<GeneralSetting> Settings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<TimetableRecord> TimetableRecords { get; set; }
        public DbSet<EmailQueue> EmailQueue { get; set; }
        public DbSet<EmailTemplate> EmailTemplates { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<TournamentResult> TournamentResults { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Event> Events { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>().ToTable(nameof(Locations));
            modelBuilder.Entity<UserRequest>().ToTable(nameof(UserRequests));
            modelBuilder.Entity<GeneralSetting>().ToTable(nameof(Settings)).HasDiscriminator<string>("SettingsType");
            modelBuilder.Entity<User>().ToTable(nameof(Users));
            modelBuilder.Entity<Section>().ToTable(nameof(Sections));
            modelBuilder.Entity<TimetableRecord>().ToTable(nameof(TimetableRecords));
            modelBuilder.Entity<EmailQueue>().ToTable(nameof(EmailQueue));
            modelBuilder.Entity<EmailTemplate>().ToTable(nameof(EmailTemplates));
            modelBuilder.Entity<Image>().ToTable(nameof(Images));
            modelBuilder.Entity<Tournament>().ToTable(nameof(Tournaments));
            modelBuilder.Entity<TournamentResult>().ToTable(nameof(TournamentResults));
            modelBuilder.Entity<News>().ToTable(nameof(News));
            modelBuilder.Entity<Event>().ToTable(nameof(Events));
           
            modelBuilder.ApplyGlobalFilters(e => !e.Deleted);
           
            SeedData(modelBuilder);
            
            base.OnModelCreating(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            var defaultUsers = new[]
            {
                new User
                {
                    Id = Guid.NewGuid(),
                    Email = "ardasovvadim@gmail.com",
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                    UserTypes = UserType.Admin
                }
            };
            
            modelBuilder.Entity<User>().HasData(defaultUsers);
        }
    }
}