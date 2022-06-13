using Telegram.Bot.Types;

namespace MG.WebHost.Models.Telegram;

public class BotStatusResponseDto
{
    public bool TokenIsValid { get; set; }
    public string Error { get; set; }
    public WebhookInfo WebHookInfo { get; set; }
}