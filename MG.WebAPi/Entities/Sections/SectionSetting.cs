using System;

namespace MG.WebApi.Entities.Sections
{
    public class SectionSetting : GeneralSetting
    {
        public Guid SectionId { get; set; }
        public virtual Section Section { get; set; }
    }
}