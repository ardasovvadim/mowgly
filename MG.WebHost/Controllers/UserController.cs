using MG.WebHost.Config;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using MG.WebHost.Models.Auth;
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

        [HttpPost("list"), Authorize(MgPermissions.User.Get)]
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

        [HttpGet("{id}"), Authorize(MgPermissions.User.Get)]
        public async Task<UserEditModel> GetByIdAsync(Guid id)
        {
            return await BaseService.GetByIdAsync<UserEditModel, User>(id, nameof(Entities.Users.User.Profiles));
        }

        [HttpPost, Authorize(MgPermissions.User.Create)]
        public async Task<UserEditModel> SaveAsync(UserEditModel request)
        {
            return await _userService.SaveAsync(request);
        }

        [HttpDelete("{id}"), Authorize(MgPermissions.User.Delete)]
        public async Task DeleteAsync(Guid id)
        {
            await BaseService.DeleteAsync<User>(id);
        }

        [HttpPost("registration")]
        public async Task<UserValidationResponseDto> RegisterAsync(UserRegistrationDto request)
        {
            return await _userService.RegisterAsync(request);
        }

        [HttpPost("login")]
        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
        {
            return await _userService.LoginAsync(request);
        }

        [HttpGet("profile"), Authorize]
        public async Task<UserProfileDto> GetProfileAsync()
        {
            return await _userService.GetProfileAsync(CurrentUserId);
        }

        [HttpPost("profile"), Authorize]
        public async Task<UserValidationResponseDto> SaveProfileAsync(UserProfileSaveDto request)
        {
            return await _userService.SaveProfileAsync(CurrentUserId, request);
        }

        [HttpGet("edit-profile"), Authorize]
        public async Task<UserProfileSaveDto> GetEditProfileAsync()
        {
            return await _userService.GetEditProfileAsync(CurrentUserId);
        }

        [HttpPost("change-password"), Authorize]
        public async Task<UserValidationResponseDto> ChangePasswordAsync(ChangePasswordRequestDto request)
        {
            return await _userService.ChangePasswordAsync(CurrentUserId, request);
        }

        [HttpPost("signin-google")]
        public async Task<LoginResponseDto> SingInGoogleAsync(GoogleRequest request)
        {
            return await _userService.SingInGoogleAsync(request);
        }

        [HttpPost("signup-google")]
        public async Task<UserValidationResponseDto> SignUpGoogleAsync(GoogleRequest request)
        {
            return await _userService.SignUpGoogleAsync(request);
        }
        
        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> RefreshAsync(RefreshTokenRequest request)
        {
            if (request is null)
                return BadRequest("Invalid client request");

            return Ok(await _userService.RefreshTokenAsync(request));
        }
    }
}