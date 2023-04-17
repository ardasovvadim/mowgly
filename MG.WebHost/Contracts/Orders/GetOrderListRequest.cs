namespace MG.WebHost.Contracts.Orders;

public record GetOrderListRequest : FilterPageRequest
{
    public DateTime? CreatedTime { get; set; }
    public bool? Processed { get; set; }
}