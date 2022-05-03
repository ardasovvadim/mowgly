namespace MG.WebAPi.Models
{
    public record PageRequest
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string Sort { get; set; }
    }
}