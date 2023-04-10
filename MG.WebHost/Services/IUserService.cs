using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Google.Apis.Auth;
using MG.WebHost.Database;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Auth;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Users;
using MG.WebHost.Exceptions;
using MG.WebHost.JwtFeatures;
using MG.WebHost.Models.Auth;
using MG.WebHost.Models.Users;
using MG.WebHost.Repositories;
using MG.WebHost.Settings;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using DataType = MG.WebHost.Entities.Enums.DataType;

namespace MG.WebHost.Services
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

    public class UserService : BaseService, IUserService
    {
        const string GoogleProvider = "Google";

        private CacheUtils Cache { get; }
        private UserManager<User> UserManager { get; }
        private JwtHandler JwtHandler { get; }
        private GoogleSettings GoogleSettings { get; }
        private IRepository<MgLoginModel> LoginModelRepo { get; }
        private readonly JwtSettings _jwtSettings;
        private readonly INotifierService _notificationService;

        public UserService(IServiceProvider serviceProvider, UserManager<User> userManager, JwtHandler jwtHandler, CacheUtils cache, IOptions<GoogleSettings> googleOptions, IRepository<MgLoginModel> loginModelRepo, IOptions<JwtSettings> jwtOptions, INotifierService notificationService) : base(serviceProvider)
        {
            UserManager = userManager;
            JwtHandler = jwtHandler;
            Cache = cache;
            LoginModelRepo = loginModelRepo;
            _notificationService = notificationService;
            GoogleSettings = googleOptions.Value;
            _jwtSettings = jwtOptions.Value;
        }

        public async Task<UserEditModel> SaveAsync(UserEditModel request)
        {
            if (request == null)
                return null;

            var repo = Repository<User>();
            var isNew = request.Id == null;
            using var transaction = await repo.BeginTransactionAsync();

            try
            {
                await ValidateModelAsync(request, isNew);

                request.UserTypes ??= UserType.None;

                var user = isNew
                    ? new User ()
                    : await repo.GetByIdAsync(request.Id.Value, nameof(User.Profiles));

                if (user == null)
                    throw new ArgumentException("Пользователь не был найден");

                if (!isNew && (request.Email != user.Email || request.Email != user.UserName))
                {
                    await RunUserManagerFuncAsync(() => UserManager.SetUserNameAsync(user, request.Email));
                    await RunUserManagerFuncAsync(() => UserManager.SetEmailAsync(user, request.Email));
                }

                if (request.UserTypes != user.UserTypes)
                {
                    var requestRoles = Enum.GetValues<UserType>()
                        .Where(v => (request.UserTypes & v) == v && v != UserType.None)
                        .Select(v => v.ToString("G"))
                        .ToList();
                    var existingRoles = await UserManager.GetRolesAsync(user);

                    var newRoles = requestRoles.Except(existingRoles).ToList();
                    if (newRoles.Any())
                        await UserManager.AddToRolesAsync(user, newRoles);

                    var rolesToDelete = existingRoles.Except(requestRoles).ToList();
                    if (rolesToDelete.Any())
                        await UserManager.RemoveFromRolesAsync(user, rolesToDelete);

                    if ((newRoles.Any() || rolesToDelete.Any()) && !isNew)
                        await UserManager.UpdateSecurityStampAsync(user);
                }

                Mapper.Map(request, user);

                await RunUserManagerFuncAsync(() => isNew ? UserManager.CreateAsync(user) : UserManager.UpdateAsync(user));

                await repo.CommitTransactionAsync();
                await repo.SaveChangesAsync();

                return Mapper.Map<UserEditModel>(user);
            }
            catch (Exception)
            {
                await repo.RollbackTransactionAsync();
                throw;
            }
        }

        public async Task<UserValidationResponseDto> RegisterAsync(UserRegistrationDto request)
        {
            var user = Mapper.Map<UserRegistrationDto, User>(request);
            var result = await UserManager.CreateAsync(user, request.Password);

            return result.Succeeded
                ? new UserValidationResponseDto { IsSuccess = true }
                : new UserValidationResponseDto { IsSuccess = false, Errors = result.Errors.Select(r => r.Description) };
        }

        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
        {
            var user = await UserManager.FindByNameAsync(request.Email);

            if (user == null || !await UserManager.CheckPasswordAsync(user, request.Password))
                return new LoginResponseDto { IsSuccess = false, ErrorMessage = "Неправильный емейл или пароль" };

            return await GetUserLoginResponseAsync(user);
        }

        private async Task<LoginResponseDto> GetUserLoginResponseAsync(User user)
        {
            var token = JwtHandler.GenerateToken(user);
            var refreshToken = JwtHandler.GenerateRefreshToken();
            var refreshTokenExpiration = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpiryInDays);

            var loginModel = await LoginModelRepo.GetQueryable().FirstOrDefaultAsync(e => e.UserId == user.Id);
            if (loginModel != null)
            {
                loginModel.RefreshToken = refreshToken;
                loginModel.RefreshTokenExpiryTime = refreshTokenExpiration;
            }
            else
            {
                loginModel = new MgLoginModel
                {
                    UserId = user.Id,
                    RefreshToken = refreshToken,
                    RefreshTokenExpiryTime = refreshTokenExpiration
                };
                await LoginModelRepo.InsertAsync(loginModel);
            }

            await LoginModelRepo.SaveChangesAsync();
            
            return new LoginResponseDto
            {
                Token = token, 
                RefreshToken = refreshToken,
                IsSuccess = true
            };
        }

        public async Task<UserProfileDto> GetProfileAsync(Guid userId)
        {
            var user = await GetUserProfileImplAsync(userId);

            if (user == null)
                throw new BusinessException("User not found");

            var result = Mapper.Map<User, UserProfileDto>(user);
            result.Permissions = await GetPermissionsAsync(userId);
            result.Roles = await UserManager.GetRolesAsync(user);

            return result;
        }

        private async Task<User> GetUserProfileImplAsync(Guid userId)
        {
            return await Repository<User>()
                .GetQueryable()
                .Include(u => u.Profiles)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<IEnumerable<string>> GetPermissionsAsync(Guid userId)
        {
            var user = await Repository<User>().GetByIdAsync(userId);

            if (user == null)
                return Enumerable.Empty<string>();

            var permRepo = Repository<Permission>();
            var roles = await UserManager.GetRolesAsync(user);
            return await permRepo
                .GetQueryable()
                .Where(p => p.Users.Any(u => u.Id == userId) || p.Roles.Any(r => roles.Contains(r.Name)))
                .Select(u => u.Name)
                .ToListAsync();
        }

        public async Task<LoginResponseDto> SingInGoogleAsync(GoogleRequest request)
        {
            var payload = await VerifyGoogleToken(request);

            if (payload == null)
                return new LoginResponseDto
                {
                    IsSuccess = false,
                    ErrorMessage = "Недействительная внешняя аутентификация"
                };

            var info = new UserLoginInfo(GoogleProvider, payload.Subject, GoogleProvider);
            var user = await UserManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            if (user != null)
                return await GetUserLoginResponseAsync(user);

            user = await UserManager.FindByEmailAsync(payload.Email);

            if (user == null)
                return new LoginResponseDto
                {
                    IsSuccess = false,
                    ErrorMessage = "Пользователь не существует"
                };

            var result = await UserManager.AddLoginAsync(user, info);

            if (!result.Succeeded)
                return new LoginResponseDto
                {
                    ErrorMessage = string.Join("\n", result.Errors.Select(e => e.Description)),
                    IsSuccess = false
                };

            return await GetUserLoginResponseAsync(user);
        }

        public async Task<UserValidationResponseDto> SignUpGoogleAsync(GoogleRequest request)
        {
            UserValidationResponseDto GetResponse(IdentityResult result) => new()
            {
                IsSuccess = result.Succeeded,
                Errors = result.Errors.Select(e => e.Description)
            };

            var payload = await VerifyGoogleToken(request);

            if (payload == null)
                return new UserValidationResponseDto
                {
                    IsSuccess = false,
                    Errors = new[] { "Недействительная внешняя аутентификация" }
                };

            var info = new UserLoginInfo(GoogleProvider, payload.Subject, GoogleProvider);
            var user = await UserManager.FindByEmailAsync(payload.Email);

            if (user != null)
                return new UserValidationResponseDto
                {
                    IsSuccess = false,
                    Errors = new[] { "Пользователь уже существует с таким емейлом" }
                };

            user = new User(payload.GivenName, payload.FamilyName)
            {
                UserName = payload.Email,
                Email = payload.Email,
                Profiles = new HashSet<UserProfile>()
            };

            if (payload.Picture.IsNotNullOrEmpty())
                user.Profiles.Add(new UserProfile { Name = UserProfileKeys.UserAvatar, DataType = DataType.Html, Value = payload.Picture });

            var result = await UserManager.CreateAsync(user);

            if (!result.Succeeded)
                return GetResponse(result);

            result = await UserManager.AddLoginAsync(user, info);

            if (!result.Succeeded)
                return GetResponse(result);

            return new UserValidationResponseDto
            {
                IsSuccess = true
            };
        }

        public async Task<UserValidationResponseDto> SaveProfileAsync(Guid userId, UserProfileSaveDto request)
        {
            if (request == null)
                return null;

            var repo = Repository<User>();

            var user = await repo.GetByIdAsync(userId, nameof(User.Profiles));

            if (user == null)
                throw new ArgumentException("Пользователь не был найден");

            Mapper.Map(request, user);

            var result = await UserManager.UpdateAsync(user);
            return new UserValidationResponseDto
            {
                IsSuccess = result.Succeeded,
                Errors = result.Errors.Select(e => e.Description).ToList()
            };
        }

        public async Task<UserProfileSaveDto> GetEditProfileAsync(Guid userId)
        {
            var user = await GetUserProfileImplAsync(userId);
            return Mapper.Map<User, UserProfileSaveDto>(user);
        }

        public async Task<UserValidationResponseDto> ChangePasswordAsync(Guid userId, ChangePasswordRequestDto request)
        {
            var user = await UserManager.FindByIdAsync(userId.ToString());
            if (user == null)
                throw new BusinessException("Пользователь не найден");

            var result = await UserManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
            return new UserValidationResponseDto
            {
                Errors = result.Errors.Select(e => e.Description).ToList(),
                IsSuccess = result.Succeeded
            };
        }

        public async Task<LoginResponseDto> RefreshTokenAsync(RefreshTokenRequest request)
        {
            LoginResponseDto BadResponse(string message = null) => new() { IsSuccess = false, ErrorMessage = message ?? "Неверный запрос клиента" };
            var loginModelRepo = Repository<MgLoginModel>();
            ClaimsPrincipal principal;
            try
            {
                principal = JwtHandler.GetPrincipalFromExpiredToken(request.AccessToken);
            }
            catch (Exception e)
            {
                return BadResponse(e.Message);
            }

            if (!Guid.TryParse(principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value, out var userId))
                return BadResponse();

            var user = await loginModelRepo.GetQueryable().FirstOrDefaultAsync(e => e.UserId == userId);
            if (user is null || user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return BadResponse();
            
            var newAccessToken = JwtHandler.GenerateToken(principal.Claims);
            var newRefreshToken = JwtHandler.GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            
            await loginModelRepo.SaveChangesAsync();

            return new LoginResponseDto
            {
                IsSuccess = true,
                Token = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        // TODO: add perm
        // migrationBuilder.Sql("INSERT INTO Permissions ([Id], [Name], [CreatedDate], [Deleted]) VALUES (N'B160A8AE-65F4-4A11-BCB9-6CACD896F785', N'Permission.User.Invite', GETDATE(), 0)");
        public async Task<InviteMasterResponseDto> InviteUserAsync(InviteMasterDto dto)
        {
            Check.NotNullOrEmpty(dto.Email, nameof(dto.Email));
            Check.NotNullOrEmpty(dto.Name, nameof(dto.Name));
            
            var userRepo = Repository<User>();

            if (await userRepo.IsExistsAsync(u => u.NormalizedEmail == dto.Email.ToUpper()))
                return new InviteMasterResponseDto
                {
                    Errors = new[] { "Користувач із таким емейлом вже існує" },
                    IsSuccess = false
                };

            var invite = new UserInvite
            {
                Name = dto.Name,
                Email = dto.Email,
                SendEmail = dto.SendEmail,
                Expiration = DateTime.UtcNow.AddDays(2)
            };

            var userInviteRepo = Repository<UserInvite>();
            await userInviteRepo.InsertAsync(invite);
            await userInviteRepo.SaveChangesAsync();

            await _notificationService.OnUserInviteAsync(invite);

            return new InviteMasterResponseDto
            {
                InviteId = invite.Id,
                IsSuccess = true,
                InviteLink = LinkHelper.GetInviteLink(invite.Id)
            };
        }

        public async Task<InviteUserDto> GetInviteUserAsync(Guid token)
        {
            return Mapper.Map<InviteUserDto>(await GetInviteAsync(token));
        }

        public async Task<UserValidationResponseDto> RegisterByInvitationAsync(Guid token, UserRegistrationDto request)
        {
            _ = await GetInviteAsync(token);
            var result = await RegisterAsync(request);

            if (!result.IsSuccess) return result;
            
            var repo = Repository<UserInvite>();
            await repo.DeleteAsync(token);
            await repo.SaveChangesAsync();

            var user = await UserManager.FindByEmailAsync(request.Email);
            user.UserTypes |= UserType.Master;
            await UserManager.UpdateAsync(user);
            await UserManager.AddToRoleAsync(user, UserType.Master.ToString("G"));

            return result;
        }
        
        private async Task<UserInvite> GetInviteAsync(Guid token)
        {
            var repo = Repository<UserInvite>();
            var invite = await repo.GetByIdAsync(token);
            
            if (invite is null)
                throw new BusinessException("Запрошення не знайдено");
            
            if (invite.Expiration <= DateTime.UtcNow)
                throw new BusinessException("Запрошення застаріло");

            return invite;
        }

        private async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(GoogleRequest request)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string> { GoogleSettings.ClientId }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(request.Credential, settings);
                return payload;
            }
            catch (Exception)
            {
                return null;
            }
        }

        private async Task RunUserManagerFuncAsync(Func<Task<IdentityResult>> action)
        {
            var result = await action();
            if (!result.Succeeded)
                throw new BusinessException("Validation exceptions:\n" + string.Join("\n", result.Errors.Select(r => $"{r.Code}: {r.Description}")));
        }

        private async Task ValidateModelAsync(UserEditModel model, bool isNew)
        {
            var validationExceptions = new List<Exception>();
            var invalidEmail = false;
            var invalidPhone = false;
            var repo = Repository<User>();

            if (!model.Email.IsNotNullOrEmpty())
                invalidEmail = isNew
                    ? await repo.GetQueryable().AnyAsync(u => u.Email == model.Email)
                    : await repo.GetQueryable().AnyAsync(u => u.Email == model.Email && u.Id != model.Id);

            if (!model.PhoneNumber.IsNullOrEmpty())
                invalidPhone = isNew
                    ? await repo.GetQueryable().AnyAsync(u => u.PhoneNumber == model.PhoneNumber)
                    : await repo.GetQueryable().AnyAsync(u => u.PhoneNumber == model.PhoneNumber && u.Id != model.Id);

            if (invalidEmail)
                validationExceptions.Add(new ValidationException("Пользователь с таким емейлом уже существует"));

            if (invalidPhone)
                validationExceptions.Add(new ValidationException("Пользователь с таким мобильным телефоном уже существует"));

            if (validationExceptions.Any())
                throw new AggregateException("Ошибки валидации", validationExceptions);
        }
    }
}