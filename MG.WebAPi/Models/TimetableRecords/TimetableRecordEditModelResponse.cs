using System.Collections.Generic;
using MG.WebAPi.Models;

namespace MG.WebApi.Models.TimetableRecords;

public class TimetableRecordEditModelResponse
{
    public IEnumerable<TimetableRecordEditModel> Data { get; set; }
    public IEnumerable<IdName> Locations { get; set; }
    public IEnumerable<IdName> Sections { get; set; }
    public IEnumerable<IdName> Masters { get; set; }
}