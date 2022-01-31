using MG.WebAPi.Entities.Interfaces;

namespace MG.WebApi.Entities.Images
{
    public class Image : BaseEntity
    {
        public string PhysicalImageSubPath { get; set; }
        public string Extension { get; set; }
    }
}