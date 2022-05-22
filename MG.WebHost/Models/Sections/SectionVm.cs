namespace MG.WebHost.Models.Sections
{
    public record SectionVm : BaseDto
    {
        public string Name { get; set; }
        public IEnumerable<GeneralSettingVm> Profiles { get; set; }
    }
}