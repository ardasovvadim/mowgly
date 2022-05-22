namespace MG.WebHost.Models.Masters
{
    public record MasterSearchCriteriaRequest : PageRequest
    {
        public IEnumerable<Guid> LocationIds { get; set; } = Enumerable.Empty<Guid>();
        public IEnumerable<Guid> SectionIds { get; set; } = Enumerable.Empty<Guid>();
    }
}