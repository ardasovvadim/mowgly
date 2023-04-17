namespace MG.WebHost.Settings
{
    public class AppSettings
    {
        public const string SettingsSection = "AppSettings";
        public bool DeleteDatabaseOnRun { get; set; }
        public string SelfUrl { get; set; }
        public string SendGridApiKey { get; set; }
    }
}