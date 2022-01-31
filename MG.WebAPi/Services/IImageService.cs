using System;
using System.IO;
using System.Threading.Tasks;
using MG.WebApi.Entities.Images;
using MG.WebAPi.Models;
using MG.WebAPi.Repositories;
using MG.WebAPi.Utils;

namespace MG.WebAPi.Services
{
    public interface IImageService
    {
        Task<ImageDto> GetImagePhysicalPathOrDefault(Guid imageGuid);
    }

    public class ImageService : IImageService
    {
        private readonly IRepository<Image> _imageRepository;
        private readonly IDirectoryUtils _directoryUtils;
        private const string ImageFolder = "Source/Images";

        public ImageService(IRepository<Image> imageRepository,
            IDirectoryUtils directoryUtils)
        {
            _imageRepository = imageRepository;
            _directoryUtils = directoryUtils;
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
                PhysicalImageSubPath = Path.Combine(imageFolderFullPath, $"{image.Id}.{image.Extension}")
            };
        }
    }
}