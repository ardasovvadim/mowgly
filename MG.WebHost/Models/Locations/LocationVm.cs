namespace MG.WebHost.Models.Locations
{
    public record LocationVm : BaseDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string GoogleMapsLink { get; set; }
    }
}