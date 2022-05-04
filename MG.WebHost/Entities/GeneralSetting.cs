using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities
{
    public abstract class GeneralSetting : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public DataType DataType { get; set; }
    }
}