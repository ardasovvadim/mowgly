using System;
using System.Collections.Generic;

namespace MG.WebAPi.Models.Masters
{
    public record MasterSearchCriteriaRequest
    {
        public IEnumerable<Guid> LocationIds { get; set; }
        public IEnumerable<Guid> SectionIds { get; set; }
        public PageRequest PageRequest { get; set; }
    }
}