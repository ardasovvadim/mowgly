using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MG.WebAPi.Controllers;
using MG.WebAPi.Models.News;
using MG.WebAPi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebApi.Controllers;

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
    
    [HttpPost]
    public async Task<NewsDetailsEditModel> AddNews(NewsDetailsEditModel request)
    {
        return await _newsService.AddNews(request);
    }
    
    [HttpDelete("{newsId}")]
    public async Task DeleteNews(Guid newsId)
    {
        await _newsService.DeleteNews(newsId);
    }
}