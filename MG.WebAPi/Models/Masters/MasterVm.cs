using System.Collections.Generic;

namespace MG.WebAPi.Models.Masters
{
    public record MasterVm : BaseDto
    {
        public string Name { get; set; }
        public IEnumerable<GeneralSettingVm> Profiles { get; set; }
    }
}