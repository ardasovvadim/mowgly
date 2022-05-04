using System.Collections.Generic;

namespace MG.WebHost.Models
{
    public record Page<T> where T : class
    {
        public bool NextPageAvailable => PageNumber * PageSize < Count;
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public IEnumerable<T> Elements { get; set; }
    }
}