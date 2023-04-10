using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.News;

public class Category : BaseEntity
{
    public string Name { get; set; }

    public ICollection<News> News { get; set; }
}