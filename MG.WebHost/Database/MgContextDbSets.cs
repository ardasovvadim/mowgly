using MG.WebHost.Entities;
using MG.WebHost.Entities.Auth;
using MG.WebHost.Entities.Emails;
using MG.WebHost.Entities.Images;
using MG.WebHost.Entities.Interfaces;
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
        public DbSet<Section> Sections { get; set; }
        public DbSet<TimetableRecord> TimetableRecords { get; set; }
        public DbSet<EmailQueue> EmailQueue { get; set; }
        public DbSet<EmailTemplate> EmailTemplates { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<TournamentResult> TournamentResults { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<MgLoginModel> LoginModels { get; set; }
        
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
            modelBuilder.Entity<News>()
                .ToTable(nameof(News))
                .HasOne(e => e.Tournament)
                .WithMany(e => e.News)
                .HasForeignKey(e => e.TournamentId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Permission>().ToTable(nameof(Permissions));
            modelBuilder.Entity<MgLoginModel>(t =>
            {
                t.ToTable(nameof(LoginModels));
                t.HasOne<User>()
                    .WithOne()
                    .HasForeignKey<MgLoginModel>(e => e.UserId);
            });
            
            modelBuilder.Entity<Order>(t =>
                {
                    t.ToTable(nameof(Orders))
                        .HasOne(e => e.Section)
                        .WithMany()
                        .HasForeignKey(e => e.SectionId)
                        .IsRequired(false);
                    t.HasOne(e => e.Location)
                        .WithMany()
                        .HasForeignKey(e => e.LocationId)
                        .IsRequired(false);
                    t.HasOne(e => e.Master)
                        .WithMany()
                        .HasForeignKey(e => e.MasterId)
                        .IsRequired(false);
                });

            modelBuilder.ApplyGlobalFilters(e => !e.Deleted);
            
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            OnSaveChanges();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnSaveChanges();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            OnSaveChanges();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
        {
            OnSaveChanges();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void OnSaveChanges()
        {
            var insertedEntries = ChangeTracker.Entries()
                .Where(x => x.State == EntityState.Added)
                .Select(x => x.Entity);
            
            foreach(var insertedEntry in insertedEntries)
                if(insertedEntry is IBaseEntity auditableEntity)
                    auditableEntity.CreatedDate = DateTime.UtcNow;
            
            var modifiedEntries = this.ChangeTracker.Entries()
                .Where(x => x.State == EntityState.Modified)
                .Select(x => x.Entity);
            
            foreach (var modifiedEntry in modifiedEntries)
                if (modifiedEntry is IBaseEntity auditableEntity)
                    auditableEntity.UpdatedDate = DateTime.UtcNow;
        }
        
        
    }
}