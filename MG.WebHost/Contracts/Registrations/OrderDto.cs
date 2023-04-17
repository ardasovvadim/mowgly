namespace MG.WebHost.Contracts.Registrations
{
    public record OrderDto : BaseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool IsParent { get; set; }
        
        public Guid? LocationId { get; set; }
        public Guid? SectionId { get; set; }
        public Guid? MasterId { get; set; }
    }
}