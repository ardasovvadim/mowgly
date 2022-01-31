namespace MG.Workers.Settings
{
    public class SmtpSettings
    {
        public const string SettingsSection = "SmtpSettings";
        public string Server { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public int Port { get; set; }
        public int Delay { get; set; }
        public int ProcessingEmails { get; set; }
        public int EmailMaxRetries { get; set; }
    }
}