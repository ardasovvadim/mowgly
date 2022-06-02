using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using MG.WebHost.Entities.Users;

namespace MG.WebHost.Config;

public static class IdentityConfig
{
    public static User[] GetUsers() =>
        new []
        {
            new User("Vadim", "Ardasov")
        };
    
    public static Client[] GetClients() =>
        new []
        {
            new Client
            {
                ClientName = "Mowgly-Client",
                ClientId = "mowgly-client",
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = new List<string>{ "https://localhost:4200/signin-callback", "https://localhost:4200/assets/silent-callback.html" },
                RequirePkce = true,
                AllowAccessTokensViaBrowser = true,
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "companyApi"
                },
                AllowedCorsOrigins = { "https://localhost:4200" },
                RequireClientSecret = false,
                PostLogoutRedirectUris = new List<string> { "https://localhost:4200/signout-callback" },
                RequireConsent = false,
                AccessTokenLifetime = 600
            }
        };
}