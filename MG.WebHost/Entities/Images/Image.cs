using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Images
{
    public class Image : BaseEntity
    {
        public string PhysicalImageSubPath { get; set; }
        public string Extension { get; set; }
    }
}