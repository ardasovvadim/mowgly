using System;

namespace MG.WebAPi.Models.News;

public record NewsVm
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Author { get; set; }
    public Guid AuthorId { get; set; }
    public DateTime? CreatedDate { get; set; }
    public string ImageUrl { get; set; }
}