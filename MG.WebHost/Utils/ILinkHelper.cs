using MG.WebHost.Settings;
using Microsoft.Extensions.Options;

namespace MG.WebHost.Utils;

public interface ILinkHelper
{
    string GetInviteLink(Guid inviteId);
}

public class LinkHelper : ILinkHelper
{
    private readonly AppSettings _settings;

    public LinkHelper(IOptions<AppSettings> settings)
    {
        Check.NotNull(settings?.Value, nameof(settings));
        
        _settings = settings!.Value;
    }

    public string GetInviteLink(Guid inviteId)
    {
        return new UriBuilder(_settings.SelfUrl)
        {
            Path = $"user-registration",
            Query = $"token={inviteId}"
        }.ToString();
    }
}