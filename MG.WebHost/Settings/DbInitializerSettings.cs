namespace MG.WebHost.Settings;

public class DbInitializerSettings
{
    public const string Name = "DbInitializer";
    public bool RecreateDb { get; set; } = false;
    public bool MigrateDb { get; set; }
}