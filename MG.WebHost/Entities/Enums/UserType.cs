using System;

namespace MG.WebHost.Entities.Enums
{
    [Flags]
    public enum UserType
    {
        None = 0,
        Moderator = 1 << 0,
        Student = 1 << 1,
        Master = 1 << 2,
        Admin = 1 << 3,
        Parent = 1 << 4
    }
}