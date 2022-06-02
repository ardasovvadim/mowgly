using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Users;
using MG.WebHost.Exceptions;
using MG.WebHost.Models.Masters;
using MG.WebHost.Models.Users;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Services
{
    public interface IUserService
    {
        Task<UserEditModel> SaveAsync(UserEditModel request);
    }

    public class UserService : BaseService, IUserService
    {
        public UserService(IServiceProvider serviceProvider, UserManager<User> userManager) : base(serviceProvider)
        {
            UserManager = userManager;
            UserManager.UserValidators.Add(new UserValidator<User>{});
        }

        private UserManager<User> UserManager { get; }

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
                    ? new User { UserTypes = UserType.Master }
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