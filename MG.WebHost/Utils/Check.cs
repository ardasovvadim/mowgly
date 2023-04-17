namespace MG.WebHost.Utils;

public static class Check
{
    public static void NotNull(object obj, string name)
    {
        if (obj == null)
            throw new ArgumentNullException($"{name} cannot be null.");
    }

    public static void NotNullOrEmpty(string str, string name)
    {
        if (str.IsNullOrEmpty())
            throw new ArgumentException($"{name} не може бути пустим або null");
    }
}