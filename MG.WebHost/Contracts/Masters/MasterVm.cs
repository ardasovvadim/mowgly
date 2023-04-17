namespace MG.WebHost.Contracts.Masters
{
    public record MasterVm : BaseDto
    {
        public string Name { get; set; }
        public IEnumerable<GeneralSettingVm> Profiles { get; set; }
    }
}