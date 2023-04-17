namespace MG.WebHost.Contracts.Locations;

public record AdminLocationVm : BaseDto
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public DateTime CreatedDate { get; set; }
}