using System.Reflection;

namespace MG.WebHost.Config;

public static class MgPermissions
{
    private const string Prefix = "Permission";

    public static class User
    {
        private const string Prefix = MgPermissions.Prefix + ".User";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
        public const string Delete = Prefix + ".Delete";
        public const string Invite = Prefix + ".Invite";
    }

    public static class Tournament
    {
        private const string Prefix = MgPermissions.Prefix + ".Tournament";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
        public const string Delete = Prefix + ".Delete";
    }
    
    public static class TimetableRecord
    {
        private const string Prefix = MgPermissions.Prefix + ".TimetableRecord";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
        public const string Delete = Prefix + ".Delete";
    }
    
    public static class Section
    {
        private const string Prefix = MgPermissions.Prefix + ".Section";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
        public const string Delete = Prefix + ".Delete";
    }
    
    public static class News
    {
        private const string Prefix = MgPermissions.Prefix + ".News";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
        public const string Delete = Prefix + ".Delete";
    }
    
    public static class Master
    {
        private const string Prefix = MgPermissions.Prefix + ".Master";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
        public const string Delete = Prefix + ".Delete";
    }
    
    public static class Location
    {
        private const string Prefix = MgPermissions.Prefix + ".Location";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
        public const string Delete = Prefix + ".Delete";
    }
    
    public static class Event
    {
        private const string Prefix = MgPermissions.Prefix + ".Event";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
        public const string Delete = Prefix + ".Delete";
    }
    
    public static class Role
    {
        private const string Prefix = MgPermissions.Prefix + ".Role";
        
        public const string Get = Prefix + ".Get";
        public const string Create = Prefix + ".Create";
    }
    
    public static class Order
    {
        private const string Prefix = MgPermissions.Prefix + ".Order";
        
        public const string Get = Prefix + ".Get";
        public const string Edit = Prefix + ".Edit";
        public const string Delete = Prefix + ".Delete";
        // TODO: add to migration
        public const string Notification = Prefix + ".Notification";
    }

    public static class Settings
    {
        private const string Prefix = MgPermissions.Prefix + ".Settings";
        
        public const string Configure = Prefix + ".Configure";
    }

    public static IEnumerable<string> GetPermissions() => GetPermissions(typeof(MgPermissions));

    private static IEnumerable<string> GetPermissions(Type type)
    {
        var perms = type
            .GetFields(BindingFlags.Public | BindingFlags.Static)
            .Select(f => f.GetValue(null)?.ToString())
            .ToList();
        perms.AddRange(type.GetNestedTypes().ToList().SelectMany(GetPermissions).ToList());
        return perms;
    }
}