using System.Collections.Generic;

namespace MG.WebHost.Models.Sections
{
    public record SectionVm : BaseDto
    {
        public string Name { get; set; }
        public IEnumerable<GeneralSettingVm> Settings { get; set; }
    }
}