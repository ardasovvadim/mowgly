using System;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Entities.Users;

namespace MG.WebHost.Entities.News;

public class News : BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime? PublishedDate { get; set; }
    public string ImageUrl { get; set; }
    public string Blocks { get; set; }
    
    public Guid AuthorId { get; set; }
    public User Author { get; set; }
}