using MG.WebHost.Entities.Users;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace MG.WebHost.Security;

public class TelegramTokenProvider : DataProtectorTokenProvider<User>
{
    public const string ProviderName = nameof(TelegramTokenProvider);
    public const string AuthPurpose = "Auth";
    
    public TelegramTokenProvider(IDataProtectionProvider dataProtectionProvider, IOptions<TelegramTokenProviderOptions> options, ILogger<DataProtectorTokenProvider<User>> logger) : base(dataProtectionProvider, options, logger)
    {
    }
}

public class TelegramTokenProviderOptions : DataProtectionTokenProviderOptions
{
    
}