using System.Threading.Tasks;
using MG.WebAPi.Models;
using MG.WebAPi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebAPi.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpGet("login")]
        public async Task<OkResult> Login(LoginModel loginModel)
        {
            await _userService.LoginAsync(loginModel);
            return Ok();
        }
    }
}