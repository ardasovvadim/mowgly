using System;

namespace MG.WebHost.Models.Registrations
{
    public record RegistrationDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsParent { get; set; }
        public bool RememberMe { get; set; }
        public Guid LocationId { get; set; }
        public Guid SectionId { get; set; }
        public Guid MasterId { get; set; }
    }
}