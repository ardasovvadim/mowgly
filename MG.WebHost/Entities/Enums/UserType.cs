using System;

namespace MG.WebHost.Entities.Enums
{
    [Flags]
    public enum UserType
    {
        None = 0,
        Moderator = 1,
        Student = 2,
        Master = 4,
        Admin = 8,
        Parent = 16
    }
}