namespace MG.WebHost.Models.Sections;

public class AdminSectionVm
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public int? MasterCount { get; set; }
}