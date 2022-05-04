using System.Threading.Tasks;
using MG.WebHost.Controllers;
using MG.WebHost.Models.Registrations;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers
{
    public class RegistrationController : BaseController
    {
        private readonly IRegistrationService _registrationService;

        public RegistrationController(IRegistrationService registrationService)
        {
            _registrationService = registrationService;
        }

        [HttpPost]
        public async Task<IActionResult> Registration(RegistrationDto dto)
        {
            await _registrationService.RegistrationAsync(dto);
            return Ok();
        }
    }
}