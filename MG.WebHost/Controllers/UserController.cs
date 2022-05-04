using System.Threading.Tasks;
using MG.WebHost.Models;
using MG.WebHost.Services;
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

        [AllowAnonymous]
        [HttpGet("login")]
        public async Task<OkResult> Login(LoginModel loginModel)
        {
            // await _userService.LoginAsync(loginModel);
            return Ok();
        }
    }
}