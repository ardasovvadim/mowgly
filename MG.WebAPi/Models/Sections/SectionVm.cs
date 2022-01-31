using System.Collections.Generic;

namespace MG.WebAPi.Models.Sections
{
    public record SectionVm : BaseDto
    {
        public string Name { get; set; }
        public IEnumerable<GeneralSettingVm> Settings { get; set; }
    }
}