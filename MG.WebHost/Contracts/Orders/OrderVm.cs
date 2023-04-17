namespace MG.WebHost.Contracts.Orders;

public class OrderVm
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public bool IsParent { get; set; }
    public bool Processed { get; set; }
        
    public string Location { get; set; }
    public string Section { get; set; }
    public string Master { get; set; }
    public DateTime CreatedTime { get; set; }
}