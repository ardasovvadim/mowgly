namespace MG.WebHost.Contracts
{
    public record PageRequest
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string Sort { get; set; }
        public SortOrder SortOrder { get; set; }
    }

    public enum SortOrder
    {
        Asc = 0,
        Desc
    }
}