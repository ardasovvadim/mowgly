using MG.WebHost.Entities.News;
using MG.WebHost.Models;
using MG.WebHost.Models.News;
using MG.WebHost.Services;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Controllers;

public class NewsController : BaseController
{
    private readonly INewsService _newsService;

    public NewsController(INewsService newsService)
    {
        _newsService = newsService;
    }

    [HttpGet]
    public async Task<IEnumerable<NewsVm>> GetNewsList()
    {
        return await _newsService.GetNewsList();
    }
    
    [HttpGet("{newsId}")]
    public async Task<NewsDetailsVm> GetNewsDetails(Guid newsId)
    {
        return await _newsService.GetNewsDetails(newsId);
    }

    [HttpPost("list"), Authorize]
    public async Task<Page<AdminNewsVm>> GetAdminListAsync(AdminGetNewsRequest request)
    {
        return await BaseService.GetListAsync<AdminNewsVm, News>(request, query =>
        {
            return query
                .WhereIf(request.PublishedDate != null, n => n.PublishedDate.Value.Date == request.PublishedDate.Value.Date)
                .WhereIf(request.FilterText.IsNotNullOrEmpty(), n => n.Title.Contains(request.FilterText))
                .Include(n => n.Author);
        });
    }

    [HttpPost, Authorize]
    public async Task<NewsDetailsEditModel> AddNews(NewsDetailsEditModel request)
    {
        request.AuthorId = CurrentUserId;
        return await _newsService.AddNews(request);
    }
    
    [HttpDelete("{newsId}"), Authorize]
    public async Task DeleteNews(Guid newsId)
    {
        await _newsService.DeleteNews(newsId);
    }
}