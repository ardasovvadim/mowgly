using AutoMapper;
using MG.WebHost.Contracts.News;
using MG.WebHost.Database;
using MG.WebHost.Entities.Users;
using MG.WebHost.Repositories;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Services.News;

public class NewsService : INewsService
{
    private readonly IRepository<Entities.News.News> _newsRepository;
    private readonly IMapper _mapper;

    public NewsService(IRepository<Entities.News.News> newsRepository, IMapper mapper)
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

    private IQueryable<Entities.News.News> GetQuery()
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
            ? new Entities.News.News()
            : await _newsRepository.GetByIdAsync(request.Id.Value) ?? new Entities.News.News();

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