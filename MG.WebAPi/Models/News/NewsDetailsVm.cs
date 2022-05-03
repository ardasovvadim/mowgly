namespace MG.WebAPi.Models.News;

public record NewsDetailsVm : NewsVm
{
    public string Blocks { get; set; }
}