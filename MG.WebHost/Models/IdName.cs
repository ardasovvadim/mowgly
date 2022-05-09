namespace MG.WebHost.Models;

public class IdName
{
    public IdName()
    {
        
    }
    
    public IdName(Guid id, string name)
    {
        Id = id;
        Name = name;
    }

    public Guid? Id { get; set; }
    public string Name { get; set; }
}