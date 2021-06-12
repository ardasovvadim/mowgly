using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("settings")]
    public class PageSettingsController : ControllerBase
    {
        [HttpGet]
        public SettingVm Get()
        {
            var settings = new SettingVm
            {
                EmailAddresses = new []
                {
                    new EmailAddress{Email = "mowglyteam@gmail.com", Name = "Основная"}, 
                    new EmailAddress{Email = "sensei@mowgly.com.ua", Name = "Запасная"} 
                },
                LinkAddresses = new []
                {
                    new LinkAddress{Link = "https://vk.com/", Name = "VK"}, 
                    new LinkAddress{Link = "https://www.instagram.com/", Name = "Instagram"}, 
                    new LinkAddress{Link = "https://www.facebook.com/", Name = "Facebook"}, 
                    new LinkAddress{Link = "record-1", Name = "Record"}
                },
                PhoneNumbers = new []
                {
                    new PhoneNumber{Number = "+380 (067) 700-555-3", Name = "Kyivstar"}, 
                    new PhoneNumber{Number = "+380 (067) 700-555-3", Name = "Life"}, 
                },
                UserName = "Андрей Иванов"
            };

            return settings;
        }
    }
}