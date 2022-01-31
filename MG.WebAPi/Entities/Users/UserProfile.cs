using System;

namespace MG.WebApi.Entities.Users
{
    public class UserProfile : GeneralSetting
    {
        public virtual User User { get; set; }
        public Guid UserId { get; set; }
    }
}