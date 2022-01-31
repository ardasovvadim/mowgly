using System;
using MG.WebApi.Entities;
using MG.WebApi.Entities.Emails;
using MG.WebAPi.Entities.Enums;
using MG.WebApi.Entities.Images;
using MG.WebApi.Entities.Sections;
using MG.WebApi.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace MG.WebAPi.Database
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
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>().ToTable(nameof(Locations));
            modelBuilder.Entity<UserRequest>().ToTable(nameof(UserRequests));
            modelBuilder.Entity<GeneralSetting>().ToTable(nameof(Settings))
                .HasDiscriminator<string>("SettingsType");
            modelBuilder.Entity<User>().ToTable(nameof(Users));
            modelBuilder.Entity<Section>().ToTable(nameof(Sections));
            modelBuilder.Entity<TimetableRecord>().ToTable(nameof(TimetableRecords));
            modelBuilder.Entity<EmailQueue>().ToTable(nameof(EmailQueue));
            modelBuilder.Entity<EmailTemplate>().ToTable(nameof(EmailTemplates));
            modelBuilder.Entity<Image>().ToTable(nameof(Images));

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