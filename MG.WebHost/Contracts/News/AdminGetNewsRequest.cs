namespace MG.WebHost.Contracts.News;

public record AdminGetNewsRequest : FilterPageRequest
{
    public DateTime? PublishedDate { get; set; }
}