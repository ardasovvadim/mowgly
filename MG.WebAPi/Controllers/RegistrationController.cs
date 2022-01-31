using System.Threading.Tasks;
using MG.WebAPi.Controllers;
using MG.WebAPi.Models.Registrations;
using MG.WebAPi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebApi.Controllers
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