namespace MG.WebHost.Contracts.News;

public record AdminNewsVm
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime? PublishedDate { get; set; }
    public string AuthorName { get; set; }
}