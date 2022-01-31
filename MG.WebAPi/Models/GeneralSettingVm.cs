using System;
using MG.WebAPi.Entities.Enums;

namespace MG.WebAPi.Models
{
    public class GeneralSettingVm
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public DataType DataType { get; set; }
    }
}