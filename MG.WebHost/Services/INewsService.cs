using AutoMapper;
using MG.WebHost.Database;
using MG.WebHost.Entities.News;
using MG.WebHost.Models.News;
using MG.WebHost.Repositories;
using Microsoft.EntityFrameworkCore;

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
        return _mapper.Map<IEnumerable<NewsVm>>(await GetQuery().OrderByDescending(n => n.CreatedDate).ToListAsync());
    }

    public async Task<NewsDetailsVm> GetNewsDetails(Guid newsId)
    {
        var news = await GetQuery()
                .FirstOrDefaultAsync(e => e.Id == newsId);
        return _mapper.Map<NewsDetailsVm>(news);
    }

    private IQueryable<News> GetQuery()
    {
        return _newsRepository
            .GetQueryable()
            .Include(e => e.Author)
            .ThenInclude(e => e.Profiles.Where(p => p.Name == UserProfileKeys.UserAvatar))
            .AsNoTracking()
            ;
    }

    public async Task<NewsDetailsEditModel> AddNews(NewsDetailsEditModel request)
    {
        var isNew = !request.Id.HasValue; 
        var result = isNew
            ? new News()
            : await _newsRepository.GetByIdAsync(request.Id.Value) ?? new News();

        _mapper.Map(request, result);
        
        if (isNew)
            result.PublishedDate = DateTime.UtcNow;

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
