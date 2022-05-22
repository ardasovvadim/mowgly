using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities.Images
{
    public class Image : BaseEntity
    {
        public Image()
        {
        }

        public Image(Guid id, string imagePath, string extension)
        {
            Id = id;
            PhysicalImageSubPath = imagePath;
            Extension = extension;
        }

        public string PhysicalImageSubPath { get; set; }
        public string Extension { get; set; }
    }
}