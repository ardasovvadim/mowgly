using Telegram.Bot.Types;

namespace MG.WebHost.Contracts.Telegram;

public interface ITelegramService
{
    Task<BotStatusResponseDto> ConfigureAsync();
    Task<BotStatusResponseDto> GetStatusAsync();
    Task ProcessUpdateAsync(Update update);
    Task<string> GetTokenLinkAsync(Guid userId);
    Task SendMessageAsync(long chatId, string message);
}

public class TelegramAuthToken
{
    public Guid UserId { get; set; }
    public string Token { get; set; }
}
