namespace MG.WebHost.Contracts.Sections
{
    public record SectionVm : BaseDto
    {
        public string Name { get; set; }
        public IEnumerable<GeneralSettingVm> Profiles { get; set; }
    }
}