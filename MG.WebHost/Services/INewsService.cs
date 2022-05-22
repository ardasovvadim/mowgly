using AutoMapper;
using MG.WebHost.Entities.News;
using MG.WebHost.Models.News;
using MG.WebHost.Repositories;

namespace MG.WebHost.Services;

public interface INewsService
{
    Task<IEnumerable<NewsVm>> GetNewsList();
    Task<NewsDetailsVm> GetNewsDetails(Guid newsId);
    Task<NewsDetailsEditModel> AddNews(NewsDetailsEditModel request);
    Task DeleteNews(Guid newsId);
}

public class NewsService : INewsService
{
    private readonly IRepository<News> _newsRepository;
    private readonly IMapper _mapper;

    public NewsService(IRepository<News> newsRepository, IMapper mapper)
    {
        _newsRepository = newsRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<NewsVm>> GetNewsList()
    {
        return _mapper.Map<IEnumerable<NewsVm>>(await _newsRepository.GetAsync(null, "Author")).OrderByDescending(n => n.CreatedDate);
    }

    public async Task<NewsDetailsVm> GetNewsDetails(Guid newsId)
    {
        return _mapper.Map<NewsDetailsVm>(await _newsRepository.GetByIdAsync(newsId, include: "Author"));
    }

    public async Task<NewsDetailsEditModel> AddNews(NewsDetailsEditModel request)
    {
        var isNew = !request.Id.HasValue; 
        var result = isNew
            ? new News()
            : await _newsRepository.GetByIdAsync(request.Id.Value) ?? new News();

        if (isNew)
            result.PublishedDate = DateTime.UtcNow;

        _mapper.Map(request, result);

        if (request.Id.HasValue)
            _newsRepository.Update(result);
        else
            await _newsRepository.InsertAsync(result);

        await _newsRepository.SaveChangesAsync();

        return _mapper.Map<NewsDetailsEditModel>(result);
    }

    public async Task DeleteNews(Guid newsId)
    {
        await _newsRepository.DeleteAsync(newsId);
        await _newsRepository.SaveChangesAsync();
    }
}
