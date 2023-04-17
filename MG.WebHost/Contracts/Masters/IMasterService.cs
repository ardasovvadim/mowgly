using MG.WebHost.Entities.Users;
using MG.WebHost.Services;

namespace MG.WebHost.Contracts.Masters
{
    public interface IMasterService : IService<MasterVm, User>
    {
        Task<Page<MasterVm>> GetCardMastersBySearchCriteriaAsync(MasterSearchCriteriaRequest request);
        Task<MasterVm> GetMasterInfoAsync(Guid masterId);
        Task<MasterEditModel> GetMasterEditModel(Guid masterId);
        Task<MasterEditModel> SaveAsync(MasterEditModel model);
    }
}