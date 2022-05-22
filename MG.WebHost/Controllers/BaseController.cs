using System.Security.Claims;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        protected IBaseService BaseService => HttpContext.RequestServices.GetRequiredService<IBaseService>();

        protected Guid CurrentUserId => Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
    }
}