using MG.WebHost.Entities.Enums;

namespace MG.WebHost.Contracts
{
    public class GeneralSettingVm
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public DataType DataType { get; set; }
    }
}