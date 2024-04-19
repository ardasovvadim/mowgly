using System.Web;
using MG.WebHost.Contracts.Telegram;
using MG.WebHost.Security;
using MG.WebHost.Settings;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using User = MG.WebHost.Entities.Users.User;

namespace MG.WebHost.Services.Telegram;

public class TelegramService : BaseService, ITelegramService
{
    public TelegramService(
        ILogger<TelegramService> logger,
        IOptions<TelegramSettings> botSettings,
        IServiceProvider serviceProvider, ITelegramBotClient client, UserManager<User> userManager, CacheUtils cache) : base(serviceProvider)
    {
        Logger = logger;
        Settings = botSettings.Value;
        Client = client;
        UserManager = userManager;
        Cache = cache;
    }

    private new ILogger<TelegramService> Logger { get; }
    private TelegramSettings Settings { get; }
    private ITelegramBotClient Client { get; }
    private UserManager<User> UserManager { get; }
    private CacheUtils Cache { get; }

    public async Task<BotStatusResponseDto> ConfigureAsync()
    {
        if (!await Client.TestApiAsync())
            return new BotStatusResponseDto
            {
                TokenIsValid = false,
                Error = "Telegram bot is not ok"
            };

        await Client.DeleteWebhookAsync();
        await Client.SetWebhookAsync(
            url: Settings.WebhookUrl,
            allowedUpdates: new[] { UpdateType.Message }
        );

        return new BotStatusResponseDto
        {
            TokenIsValid = true,
            WebHookInfo = await Client.GetWebhookInfoAsync()
        };
    }

    public async Task<BotStatusResponseDto> GetStatusAsync()
    {
        var webHookStatusTask = Client.GetWebhookInfoAsync();
        var tokenIsValidTask = Client.TestApiAsync();

        await Task.WhenAll(webHookStatusTask, tokenIsValidTask);

        return new BotStatusResponseDto
        {
            TokenIsValid = tokenIsValidTask.Result,
            WebHookInfo = webHookStatusTask.Result
        };
    }

    public async Task ProcessUpdateAsync(Update update)
    {
        LogUpdate(update, "New update");

        var message = update.Message;

        if (message == null)
        {
            LogUpdate(update, "Message is null");
            return;
        }

        var chatId = message.Chat.Id;
        LogUpdate(update, "Text message received.");

        try
        {
            switch (message.Type)
            {
                case MessageType.Text:
                {
                    var text = message.Text;
                
                    if (text == null)
                        break;

                    if (text.StartsWith("/start", StringComparison.OrdinalIgnoreCase))
                    {
                        var parts = text.Split(" ");
                    
                        if (parts.Length != 2)
                            break;

                        var shortToken = parts.Last();
                        var user = await AuthoriseAsync(shortToken);

                        if (user == null)
                        {
                            await Client.SendTextMessageAsync(chatId, "Авторизация не пройдена");
                            break;
                        }
                    
                        user.TelegramChatId = chatId;
                        await UserManager.UpdateAsync(user);
                        var displayName = user.ConcatName();

                        await Client.SendTextMessageAsync(chatId, $"Авторизация пройдена {displayName}. Вы подписались на обновления.");
                    } 
                    else if (text.StartsWith("/unsubscribe", StringComparison.OrdinalIgnoreCase))
                    {
                        var userRepo = Repository<User>();
                        var users = await userRepo.GetAsync(e => e.TelegramChatId == chatId);
                        
                        foreach (var user in users)
                            user.TelegramChatId = 0;
                        
                        await userRepo.SaveChangesAsync();
                        
                        await Client.SendTextMessageAsync(chatId, $"Вы успешно отписались от обновлений.");
                    }
                    
                    break;
                }
            }
        }
        catch (Exception e)
        {
            Logger.LogError(e, "During processing telegram message something went wrong");
        }
    }

    private async Task<User> AuthoriseAsync(string shortToken)
    {
        var authToken = await Cache.GetAsync<TelegramAuthToken>(shortToken);

        if (authToken == null)
            return null;

        var user = await UserManager.FindByIdAsync(authToken.UserId.ToString());
        if (user == null)
            return null;

        return await UserManager.VerifyUserTokenAsync(user, TelegramTokenProvider.ProviderName, TelegramTokenProvider.AuthPurpose, authToken.Token)
            ? user : null;
    }

    public async Task<string> GetTokenLinkAsync(Guid userId)
    {
        var user = await UserManager.FindByIdAsync(userId.ToString());
        var token = await UserManager.GenerateUserTokenAsync(user, TelegramTokenProvider.ProviderName, TelegramTokenProvider.AuthPurpose);
        
        var shortToken = Guid.NewGuid().ToString().Replace("-", "");
        if (shortToken.Length > 64)
            shortToken = shortToken.Substring(0, 64);
        
        await Cache.SetAsync(new TelegramAuthToken
        {
            UserId = userId,
            Token = token
        }, shortToken, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
        });
        
        var uri = new UriBuilder(Settings.BotUrl);
        var query = HttpUtility.ParseQueryString("");
        query["start"] = shortToken;
        uri.Query = query.ToString();
        
        return uri.ToString();
    }

    public async Task SendMessageAsync(long chatId, string message)
    {
        await Client.SendTextMessageAsync(chatId, message, ParseMode.Html);
    }

    private void LogUpdate(Update update, string message)
    {
        Logger.LogInformation("Update id: {id}. {message}", update.Id, message);
    }
}