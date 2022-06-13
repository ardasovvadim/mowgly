using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Users;
using MG.WebHost.Utils;

namespace MG.WebHost.Entities;

public class Order : BaseEntity
{
    public Order(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
        NormalizedName = GetFullName().Replace(" ", "").ToUpper();
    }

    protected Order()
    {
        
    }

    public string FirstName { get; protected set; }
    public string LastName { get; protected set; }
    public string NormalizedName { get; protected set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public bool IsParent { get; set; }
    public bool Processed { get; set; }

    public Guid? SectionId { get; set; }
    public virtual Section Section { get; set; }
    
    public Guid? LocationId { get; set; }
    public virtual Location Location { get; set; }
    
    public Guid? MasterId { get; set; }
    public virtual User Master { get; set; }


    public string GetFullName() => (FirstName + " " + LastName).Trim();
}