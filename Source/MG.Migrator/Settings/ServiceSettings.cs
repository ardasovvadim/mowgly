namespace MG.Migrator.Settings;

public class ServiceSettings
{
    public const string Name = nameof(ServiceSettings);
    public bool RecreateDb { get; set; } = false;
    public bool MigrateDb { get; set; }
    public bool SeedData { get; set; } = false;
}