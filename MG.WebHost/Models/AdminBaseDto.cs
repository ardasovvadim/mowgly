namespace MG.WebHost.Models;

public record AdminBaseDto : BaseDto
{
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}