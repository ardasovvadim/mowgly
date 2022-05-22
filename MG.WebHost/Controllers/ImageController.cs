using MG.WebHost.Models;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers
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
            return PhysicalFile(image.PhysicalImageSubPath, $"image/{image.Extension.Replace(".", "")}");
        }

        [HttpPost, Authorize]
        public async Task<Guid> SaveAsync(ImageCreateDto request)
        {
            return await _imageService.AddAsync(request);
        }

        [HttpDelete("{id:guid}"), Authorize]
        public async Task DeleteAsync(Guid id)
        {
            await _imageService.DeleteAsync(id);
        }
        
        [HttpPost("delete"), Authorize]
        public async Task DeleteAsync(IEnumerable<Guid> ids)
        {
            await _imageService.DeleteAsync(ids);
        }
    }
}