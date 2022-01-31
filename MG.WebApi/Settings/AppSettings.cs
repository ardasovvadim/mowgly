namespace MG.WebAPi.Settings
{
    public class AppSettings
    {
        public const string SettingsSection = "AppSettings";
        public bool DeleteDatabaseOnRun { get; set; }
        public string DataSource { get; set; }
    }
}