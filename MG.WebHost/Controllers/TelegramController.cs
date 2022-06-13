using MG.WebHost.Config;
using MG.WebHost.ModelBinders;
using MG.WebHost.Models.Telegram;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Telegram.Bot.Types;

namespace MG.WebHost.Controllers;

[ApiController]
[Route("api/telegram")]
public class TelegramController : BaseController
{
    public TelegramController(ITelegramService telegramService)
    {
        TelegramService = telegramService;
    }

    private ITelegramService TelegramService { get; }

    [HttpPost("dYyOsIM28rWXOUjOwBaqqVsL6yXBBS1H")]
    public async Task GetAsync([ModelBinder(typeof(TelegramModelBinder))] Update update)
    {
        await TelegramService.ProcessUpdateAsync(update);
    }

    [HttpPost("configure"), Authorize(MgPermissions.Settings.Configure)]
    public async Task<BotStatusResponseDto> ConfigureAsync()
    {
        return await TelegramService.ConfigureAsync();
    }

    [HttpGet("state"), Authorize(MgPermissions.Settings.Configure)]
    public async Task<BotStatusResponseDto> GetStatusAsync()
    {
        return await TelegramService.GetStatusAsync();
    }

    [HttpGet("token"), Authorize(MgPermissions.Order.Notification)]
    public async Task<GetTelegramTokenResponseDto> GetTokenLinkAsync()
    {
        return new GetTelegramTokenResponseDto
        {
            Token = await TelegramService.GetTokenLinkAsync(CurrentUserId)
        };
    }
}