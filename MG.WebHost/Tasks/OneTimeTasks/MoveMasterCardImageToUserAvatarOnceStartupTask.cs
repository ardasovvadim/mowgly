using MG.WebHost.Database;
using MG.WebHost.Entities.Users;
using MG.WebHost.Repositories;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Tasks.OneTimeTasks;

public class MoveMasterCardImageToUserAvatarOneTimeStartupTask : OneTimeStartupTask
{
    protected override string Task => nameof(MoveMasterCardImageToUserAvatarOneTimeStartupTask);
    
    public MoveMasterCardImageToUserAvatarOneTimeStartupTask(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    private IRepository<UserProfile> UserProfileRepository => LazyProvider.GetRequiredService<IRepository<UserProfile>>();

    protected override async Task ExecuteOnce()
    {
        using var transaction = await UserProfileRepository.BeginTransactionAsync();

        try
        {
            var query = UserProfileRepository.GetQueryable();
            var cardImages = (await UserProfileRepository.GetAsync(p => p.Name == UserProfileKeys.CardMasterAvatarImage)).ToList();
            var userIds = cardImages.Select(p => p.UserId).ToList();
            var idsToDelete = await query.Where(p => userIds.Contains(p.UserId) && p.Name == UserProfileKeys.UserAvatar).Select(x => x.Id).ToListAsync();
            
            foreach (var id in idsToDelete)
            {
                await UserProfileRepository.DeleteAsync(id);
            }
            
            cardImages.ForEach(c => c.Name = UserProfileKeys.UserAvatar);
            
            foreach (var userProfile in cardImages)
            {
                UserProfileRepository.Update(userProfile);
            }

            await UserProfileRepository.SaveChangesAsync();
            await UserProfileRepository.CommitTransactionAsync();
        }
        catch (Exception)
        {
            await UserProfileRepository.RollbackTransactionAsync();
        }
    }

}