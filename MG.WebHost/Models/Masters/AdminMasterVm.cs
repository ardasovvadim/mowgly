namespace MG.WebHost.Models.Masters;

public record AdminMasterVm : BaseDto
{
    public string Name { get; set; }
    public string Sections { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}