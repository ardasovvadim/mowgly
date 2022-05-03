using System;
using System.Collections.Generic;

namespace MG.WebApi.Models.TimetableRecords
{
    public record TimeTableRecordCriteriaRequest
    {
        public IEnumerable<Guid> SectionGuids { get; set; }
        public IEnumerable<Guid> MasterGuids { get; set; }
        public IEnumerable<Guid> LocationGuids { get; set; }
        public IEnumerable<string> Cities { get; set; }
        public string FilterText { get; set; }
    }
}