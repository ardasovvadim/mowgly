using System;

namespace MG.WebHost.Entities.Users
{
    public class UserProfile : GeneralSetting
    {
        public virtual User User { get; set; }
        public Guid UserId { get; set; }
    }
}