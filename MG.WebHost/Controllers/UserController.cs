using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using MG.WebHost.Models.Users;
using MG.WebHost.Services;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("list")]
        public async Task<Page<AdminUserVm>> GetListAsync(AdminGetUserListRequest request)
        {
            return await BaseService.GetListAsync<AdminUserVm, User>(request, query =>
            {
                return query
                        .WhereIf(request.FilterText.IsNotNullOrEmpty(), u => 
                                u.NormalizedName.Contains(request.FilterText)
                                || u.NormalizedEmail.Contains(request.FilterText)
                                || u.PhoneNumber.Contains(request.FilterText)
                            )
                        .WhereIf(request.UserType != null, u => u.UserTypes.HasFlag(request.UserType.Value))
                    ;
            });
        }

        [HttpGet("{id}"), Authorize]
        public async Task<UserEditModel> GetByIdAsync(Guid id)
        {
            return await BaseService.GetByIdAsync<UserEditModel, User>(id, nameof(Entities.Users.User.Profiles));
        }

        [HttpPost, Authorize]
        public async Task<UserEditModel> SaveAsync(UserEditModel request)
        {
            return await _userService.SaveAsync(request);
        }

        [HttpDelete("{id}"), Authorize]
        public async Task DeleteAsync(Guid id)
        {
            await BaseService.DeleteAsync<User>(id);
        }
    }
}