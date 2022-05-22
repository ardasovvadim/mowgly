namespace MG.WebHost.Models.News;

public record AdminGetNewsRequest : FilterPageRequest
{
    public DateTime? PublishedDate { get; set; }
}