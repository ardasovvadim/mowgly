namespace MG.WebHost.Contracts.Images
{
    public interface IImageService
    {
        Task<ImageDto> GetImagePhysicalPathOrDefault(Guid imageGuid);
        Task<Guid> AddBase64ImageAsync(ImageCreateDto request);
        Task DeleteAsync(Guid id);
        Task DeleteAsync(IEnumerable<Guid> ids);
        Task<Guid> AddFormFileImageAsync(IFormFile formFile);
    }
}