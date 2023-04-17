using MG.WebHost.Entities;
using MG.WebHost.Entities.Users;

namespace MG.WebHost.Contracts.Notifications;

public interface INotifierService
{
    Task OnNewOrderAsync(Order order);
    Task OnUserInviteAsync(UserInvite invite);
}