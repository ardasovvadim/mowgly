namespace MG.WebHost.Contracts.Masters
{
    public record MasterSearchCriteriaRequest : FilterPageRequest
    {
        public IEnumerable<Guid> LocationIds { get; set; } = Enumerable.Empty<Guid>();
        public IEnumerable<Guid> SectionIds { get; set; } = Enumerable.Empty<Guid>();
        public Guid? Section { get; set; }
        public string City { get; set; }
    }
}