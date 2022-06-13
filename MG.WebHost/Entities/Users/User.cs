using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Identity;

namespace MG.WebHost.Entities.Users;

public class User : IdentityUser<Guid>, IBaseEntity
{
    public User(
        string firstName = null, 
        string lastName = null, 
        string middleName = null)
    {
        Id = Guid.NewGuid();
        SecurityStamp = Guid.NewGuid().ToString();
        SetName(firstName, lastName, middleName);
    }

    public User()
    {
        
    }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedDate { get; set; }
    public bool Deleted { get; set; }
    
    public string FirstName { get; protected set; }
    public string LastName { get; protected set; }
    public string MiddleName { get; protected set; }

    public string NormalizedName { get; protected set; }
    public long TelegramChatId { get; set; }
        
    public UserType UserTypes { get; set; }
    public DateTime? Birthday { get; set; }

    public virtual ICollection<UserProfile> Profiles { get; set; }
    public virtual ICollection<TimetableRecord> TimetableRecords { get; set; }
    public virtual ICollection<Permission> Permissions { get; set; }

    public void SetName(string firstName, string lastName, string middleName)
    {
        FirstName = firstName;
        LastName = lastName;
        MiddleName = middleName;
        NormalizedName = this.ConcatName().ToUpper();
    }

    public void SetEmail(string email)
    {
        UserName = Email = email;
        NormalizedUserName = NormalizedName = email.ToUpper();
    }
}