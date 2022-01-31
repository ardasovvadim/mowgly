using System.Collections.Generic;
using MG.WebAPi.Entities.Interfaces;
using MG.WebApi.Entities.Sections;

namespace MG.WebApi.Entities
{
    public class Location : BaseEntity
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string GoogleMapsLink { get; set; }

        public virtual ICollection<UserRequest> UserRequests { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
        public virtual ICollection<TimetableRecord> TimetableRecords { get; set; }
    }
}