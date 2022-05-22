using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Entities.Sections;

namespace MG.WebHost.Entities
{
    public class Location : BaseEntity
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string GoogleMapsLink { get; set; }

        public virtual ICollection<UserRequest> UserRequests { get; set; } = new HashSet<UserRequest>();
        public virtual ICollection<Section> Sections { get; set; } = new HashSet<Section>();
        public virtual ICollection<TimetableRecord> TimetableRecords { get; set; } = new HashSet<TimetableRecord>();
    }
}