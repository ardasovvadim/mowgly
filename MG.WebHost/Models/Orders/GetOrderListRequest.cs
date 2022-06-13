namespace MG.WebHost.Models.Orders;

public record GetOrderListRequest : FilterPageRequest
{
    public DateTime? CreatedTime { get; set; }
    public bool? Processed { get; set; }
}