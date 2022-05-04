using System;

namespace MG.WebHost.Models.News;

public record NewsDetailsEditModel
{
    public Guid? Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Guid? AuthorId { get; set; }
    public string Author { get; set; }
    public DateTime? CreatedDate { get; set; }
    public string ImageUrl { get; set; }
    public string Blocks { get; set; }
}