namespace MG.WebHost.Contracts.News;

public interface INewsService
{
    Task<IEnumerable<NewsVm>> GetNewsList();
    Task<NewsDetailsVm> GetNewsDetails(Guid newsId);
    Task<NewsDetailsEditModel> AddNews(NewsDetailsEditModel request);
    Task DeleteNews(Guid newsId);
}