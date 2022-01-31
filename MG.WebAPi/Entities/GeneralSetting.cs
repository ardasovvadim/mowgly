using MG.WebAPi.Entities.Enums;
using MG.WebAPi.Entities.Interfaces;

namespace MG.WebApi.Entities
{
    public abstract class GeneralSetting : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public DataType DataType { get; set; }
    }
}