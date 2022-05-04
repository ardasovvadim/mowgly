using System.Collections.Generic;

namespace MG.WebHost.Models.Options;

public class OptionsResponse
{
    public IEnumerable<IdName> Locations { get; set; }
    public IEnumerable<IdName> Sections { get; set; }
    public IEnumerable<string> Cities { get; set; }
}