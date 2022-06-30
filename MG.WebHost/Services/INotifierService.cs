using System.Text;
using System.Web;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Users;
using MG.WebHost.Repositories;
using MG.WebHost.Settings;
using MG.WebHost.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MG.WebHost.Services;

public interface INotifierService
{
    Task OnNewOrderAsync(Order order);
}

public class NotifierService : BaseService, INotifierService
{
    private readonly IBackgroundTaskQueue _taskQueue;

    public NotifierService(ITelegramService telegramService, IBackgroundTaskQueue taskQueue, IServiceProvider sp, IOptions<AppSettings> appSettings) : base(sp)
    {
        TelegramService = telegramService;
        _taskQueue = taskQueue;
        AppSettings = appSettings?.Value;
    }

    private ITelegramService TelegramService { get; }
    private AppSettings AppSettings { get; }

    public async Task OnNewOrderAsync(Order order)
    {
        await _taskQueue.QueueAsync(async (sp, ct) =>
        {
            await using var scope = sp.CreateAsyncScope();
            var serviceProvider = scope.ServiceProvider;
            var userRepo = serviceProvider.GetRequiredService<IRepository<User>>();
            
            var chatIds = await userRepo
                .GetQueryable()
                .Where(u => u.TelegramChatId != 0)
                .Select(u => u.TelegramChatId)
                .ToListAsync(cancellationToken: ct);
            
            if (!chatIds.Any())
                return;

            var locationRepo = serviceProvider.GetRequiredService<IRepository<Location>>();
            var sectionRepo = serviceProvider.GetRequiredService<IRepository<Section>>();
            var telegramService = serviceProvider.GetRequiredService<ITelegramService>();
            
            var masterName = order.MasterId.HasValue
                ? (await userRepo.GetByIdAsync(order.MasterId.Value))?.ConcatName()
                : null;
            var localName = order.LocationId.HasValue
                ? (await locationRepo.GetByIdAsync(order.LocationId.Value))?.Name
                : null;
            var sectionName = order.SectionId.HasValue
                ? (await sectionRepo.GetByIdAsync(order.SectionId.Value))?.Name
                : null;
            var fullName = order.GetFullName();
            
            var text = new StringBuilder();
            text.AppendLine("<b>Новая заявка</b>");
            text.AppendLine();
            
            if (fullName.IsNotNullOrEmpty())
                text.AppendLine($"Имя: {fullName}");
            if (order.Email.IsNotNullOrEmpty())
                text.AppendLine($"Емейл: {order.Email}");
            if (order.PhoneNumber.IsNotNullOrEmpty())
                text.AppendLine($"Номер телефона: <a href=\"tel:{order.PhoneNumber}\">{order.PhoneNumber}</a>");
            if (localName.IsNotNullOrEmpty())
                text.AppendLine($"Филиал: {localName}");
            if (sectionName.IsNotNullOrEmpty())
                text.AppendLine($"Филиал: {sectionName}");
            if (masterName.IsNotNullOrEmpty())
                text.AppendLine($"Инструктор: {masterName}");

            text.AppendLine();
            
            var query = HttpUtility.ParseQueryString(String.Empty);
            query["order"] = order.Id.ToString();
            var uriBuilder = new UriBuilder(AppSettings.SelfUrl)
            {
                Path = "admin/orders",
                Query = query.ToString()
            };
            
            text.AppendLine($"<a href=\"{uriBuilder}\">Ссылка на заявление</a>");

            var message = text.ToString();
            
            try
            {
                foreach (var grouping in chatIds.Zip(Enumerable.Range(0, chatIds.Count),
                                 (s, r) => new { Group = r / 10, Item = s })
                             .GroupBy(i => i.Group, g => g.Item))
                {
                    var tasks = grouping.Select(id => telegramService.SendMessageAsync(id, message)).ToList();
                    await Task.WhenAll(tasks);
                }
            }
            catch (Exception e)
            {
                Logger.LogError(e, "Error during sending notification to telegram.");
            }
        });
    }
}