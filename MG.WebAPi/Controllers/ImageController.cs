using System;
using System.Threading.Tasks;
using MG.WebAPi.Controllers;
using MG.WebAPi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebApi.Controllers
{
    public class ImageController : BaseController
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var image = await _imageService.GetImagePhysicalPathOrDefault(id);
            if (image == null)
                return BadRequest();
            return PhysicalFile(image.PhysicalImageSubPath, $"image/{image.Extension}");
        }
        
    }
}