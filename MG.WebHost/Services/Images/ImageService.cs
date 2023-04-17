using MG.WebHost.Contracts;
using MG.WebHost.Contracts.Images;
using MG.WebHost.Entities.Images;
using MG.WebHost.Exceptions;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Caching.Distributed;

namespace MG.WebHost.Services.Images;

public class ImageService : IImageService
{
    private readonly IRepository<Image> _imageRepository;
    private readonly IDirectoryUtils _directoryUtils;
    private readonly ILogger<ImageService> _logger;
    private const string ImageFolder = "Images";
    private readonly CacheUtils _cache;

    public ImageService(
        IRepository<Image> imageRepository,
        IDirectoryUtils directoryUtils, ILogger<ImageService> logger, CacheUtils cache)
    {
        _imageRepository = imageRepository;
        _directoryUtils = directoryUtils;
        _logger = logger;
        _cache = cache;
    }

    public async Task<ImageDto> GetImagePhysicalPathOrDefault(Guid imageGuid)
    {
        return await _cache.GetOrSetAsync(imageGuid.ToString(), async () =>
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
        }, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1)
        });
    }

    public async Task<Guid> AddBase64ImageAsync(ImageCreateDto request)
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
            
        var imageBytes = Convert.FromBase64String(imageDataUrlParts.Last().Replace("base64,", ""));
        using var ms = new MemoryStream(imageBytes);
            
        return await SaveImageFileAsync(pathPrefix, imageExtension, ms);
    }

    public Task DeleteAsync(Guid id)
    {
        return DeleteImplAsync(new [] {id});
    }

    public Task DeleteAsync(IEnumerable<Guid> ids)
    {
        return DeleteImplAsync(ids);
    }

    public async Task<Guid> AddFormFileImageAsync(IFormFile formFile)
    {
        if (formFile == null)
            throw new BusinessException("Image is null");
            
        var imageExtension = Path.GetExtension(formFile.FileName);
        var pathPrefix = "news";
            
        return await SaveImageFileAsync(pathPrefix, imageExtension, formFile.OpenReadStream());
    }

    private async Task<Guid> SaveImageFileAsync(string pathPrefix, string imageExtension, Stream imageStream)
    {
        var imageId = Guid.NewGuid();

        var subPath = Path.Combine(ImageFolder, pathPrefix);
        var fullPath = _directoryUtils.CombinePathFromRoot(subPath);
        var imageFolderFullPath = _directoryUtils.EnsureFolderCreated(fullPath);
        var imagePath = Path.Combine(imageFolderFullPath, imageId + imageExtension);

        await using var fs = new FileStream(imagePath, FileMode.Create);
        var imageEntity = new Image(imageId, pathPrefix, imageExtension);

        await Task.WhenAll(imageStream.CopyToAsync(fs), _imageRepository.InsertAsync(imageEntity));

        await _imageRepository.SaveChangesAsync();

        return imageEntity.Id;
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
                await _cache.RemoveAsync(id.ToString());
            }
            catch (Exception e)
            {
                _logger.LogError(e, "There was exceptions during image file deleting");
            }
        }
            
        await _imageRepository.SaveChangesAsync();
    }
}