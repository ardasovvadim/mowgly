using MG.WebHost.Entities.Images;
using MG.WebHost.Exceptions;
using MG.WebHost.Models;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Win32.SafeHandles;

namespace MG.WebHost.Services
{
    public interface IImageService
    {
        Task<ImageDto> GetImagePhysicalPathOrDefault(Guid imageGuid);
        Task<Guid> AddAsync(ImageCreateDto request);
        Task DeleteAsync(Guid id);
        Task DeleteAsync(IEnumerable<Guid> ids);
    }

    // todo: add cache
    public class ImageService : IImageService
    {
        private readonly IRepository<Image> _imageRepository;
        private readonly IDirectoryUtils _directoryUtils;
        private readonly ILogger<ImageService> _logger;
        private const string ImageFolder = "wwwroot/Images";

        public ImageService(
            IRepository<Image> imageRepository,
            IDirectoryUtils directoryUtils, ILogger<ImageService> logger)
        {
            _imageRepository = imageRepository;
            _directoryUtils = directoryUtils;
            _logger = logger;
        }

        public async Task<ImageDto> GetImagePhysicalPathOrDefault(Guid imageGuid)
        {
            var image = await _imageRepository.GetByIdAsync(imageGuid);
            if (image == null)
                return null;
            var subPath = Path.Combine(ImageFolder, image.PhysicalImageSubPath);
            var folderFullPath = _directoryUtils.CombinePathFromRoot(subPath);
            var imageFolderFullPath = _directoryUtils.EnsureFolderCreated(folderFullPath);
            
            return new ImageDto
            {
                Extension = image.Extension,
                PhysicalImageSubPath = Path.Combine(imageFolderFullPath, $"{image.Id}{image.Extension}")
            };
        }

        public async Task<Guid> AddAsync(ImageCreateDto request)
        {
            if (request == null)
                throw new BusinessException("Image is null");

            var imageDataUrlParts = request.DataUrl?.Split(";");

            if (imageDataUrlParts?.Length != 2)
                throw new BusinessException("Invalid image data url format");
            
            var imageExtension = new FileExtensionContentTypeProvider().Mappings.FirstOrDefault(pair => pair.Value == imageDataUrlParts.First().Replace("data:", "")).Key;
            if (imageExtension.IsNullOrEmpty())
                throw new BusinessException("Unsupported image file extension");

            var pathPrefix = request.PathPrefix ?? "";
            var imageId = Guid.NewGuid();
            var imageBytes = Convert.FromBase64String(imageDataUrlParts.Last().Replace("base64,", ""));
            using var ms = new MemoryStream(imageBytes);

            var subPath = Path.Combine(ImageFolder, pathPrefix);
            var fullPath = _directoryUtils.CombinePathFromRoot(subPath);
            var imageFolderFullPath = _directoryUtils.EnsureFolderCreated(fullPath);
            var imagePath = Path.Combine(imageFolderFullPath, imageId + imageExtension);

            await using var fs = new FileStream(imagePath, FileMode.Create);
            var imageEntity = new Image(imageId, pathPrefix, imageExtension);

            await Task.WhenAll(ms.CopyToAsync(fs), _imageRepository.InsertAsync(imageEntity));

            await _imageRepository.SaveChangesAsync();

            return imageEntity.Id;
        }

        public Task DeleteAsync(Guid id)
        {
            return DeleteImplAsync(new [] {id});
        }

        public Task DeleteAsync(IEnumerable<Guid> ids)
        {
            return DeleteImplAsync(ids);
        }

        private async Task DeleteImplAsync(IEnumerable<Guid> ids)
        {
            foreach (var id in ids)
            {
                try
                {
                    var image = await _imageRepository.GetByIdAsync(id);
                
                    if (image == null)
                        throw new BusinessException("Image not found");
                
                    var subPath = Path.Combine(ImageFolder, image.PhysicalImageSubPath);
                    var folderFullPath = _directoryUtils.CombinePathFromRoot(subPath);
                    var fullImagePath = Path.Combine(folderFullPath, $"{id}{image.Extension}");
                
                    File.Delete(fullImagePath);
                    await _imageRepository.DeleteAsync(id);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "There was exceptions during image file deleting");
                }
            }
            
            await _imageRepository.SaveChangesAsync();
        }
    }
}