using MG.WebHost.Contracts.Auth;

namespace MG.WebHost.Contracts.Users
{
    public interface IUserService
    {
        Task<UserEditModel> SaveAsync(UserEditModel request);
        Task<UserValidationResponseDto> RegisterAsync(UserRegistrationDto request);
        Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
        Task<UserProfileDto> GetProfileAsync(Guid userId);
        Task<IEnumerable<string>> GetPermissionsAsync(Guid userId);
        Task<LoginResponseDto> SingInGoogleAsync(GoogleRequest request);
        Task<UserValidationResponseDto> SignUpGoogleAsync(GoogleRequest request);
        Task<UserValidationResponseDto> SaveProfileAsync(Guid userId, UserProfileSaveDto request);
        Task<UserProfileSaveDto> GetEditProfileAsync(Guid userId);
        Task<UserValidationResponseDto> ChangePasswordAsync(Guid userId, ChangePasswordRequestDto request);
        Task<LoginResponseDto> RefreshTokenAsync(RefreshTokenRequest request);
        Task<InviteMasterResponseDto> InviteUserAsync(InviteMasterDto dto);
        Task<InviteUserDto> GetInviteUserAsync(Guid token);
        Task<UserValidationResponseDto> RegisterByInvitationAsync(Guid token, UserRegistrationDto request);
    }
}