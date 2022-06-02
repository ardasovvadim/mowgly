using Duende.IdentityServer.Services;
using MG.WebHost.Config;
using MG.WebHost.Database;
using MG.WebHost.Entities.Users;
using MG.WebHost.Services;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost
{
    internal static class Program
    {
        private const string MyAllowSpecificOrigins = "MyAllowSpecificOrigins";

        public static async Task Main(string[] args)
        {
            await CreateWebAppBuilder(args).Build().Configure().RunWithTasksAsync();
        }

        private static WebApplicationBuilder CreateWebAppBuilder(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var isDevelopment = builder.Environment.IsDevelopment();

            // Add services to the container.
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<MgContext>(options =>
            {
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
                if (isDevelopment)
                    options
                        .LogTo(Console.WriteLine, LogLevel.Information)
                        .EnableSensitiveDataLogging()
                        .EnableDetailedErrors();
            });
            builder.Services.AddDatabaseDeveloperPageExceptionFilter();
            builder.Services.AddHttpContextAccessor();

            builder.Services.AddDefaultIdentity<User>(options => { options.SignIn.RequireConfirmedAccount = true; })
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<MgContext>();

            if (isDevelopment)
                builder.Services.AddSingleton<ICorsPolicyService>((container) =>
                {
                    var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
                    return new DefaultCorsPolicyService(logger)
                    {
                        // todo: not for production
                        AllowedOrigins =
                        {
                            "https://localhost:4200",
                        }
                    };
                });

            builder.Services.AddIdentityServer()
                .AddProfileService<MgProfileService>()
                .AddApiAuthorization<User, MgContext>(config =>
                {
                    config.Clients.AddIdentityServerSPA("MG.WebApp", conf =>
                    {
                        // conf.
                    });
                    // config.Clients.First().AlwaysIncludeUserClaimsInIdToken = true;
                    // config.Clients.AddRange(IdentityConfig.GetClients());
                })
                ;

            builder.Services.AddAuthentication()
                .AddGoogle(o =>
                {
                    o.ClientId = "483436574759-ulj2gtbglcb0beia4ggpjm9bc5d2ufr8.apps.googleusercontent.com";
                    o.ClientSecret = "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";
                    o.SignInScheme = IdentityConstants.ExternalScheme;
                })
                .AddIdentityServerJwt();

            builder.Services.AddDistributedMemoryCache();

            if (builder.Environment.IsProduction())
                builder.Services.Configure<JwtBearerOptions>(
                    IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
                    options => options.Authority = builder.Configuration["Authority"]);

            builder.Services.AddControllersWithViews();
            builder.Services.AddRazorPages();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            if (isDevelopment)
            {
                builder.Services.AddCors(options =>
                {
                    options.DefaultPolicyName = MyAllowSpecificOrigins;
                    options
                        .AddPolicy(name: MyAllowSpecificOrigins,
                            policy =>
                            {
                                policy
                                    .WithOrigins("https://localhost:4200")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    ;
                            });
                });
            }

            builder.Services.ConfigureBusinessServices(builder.Configuration);

            return builder;
        }

        private static WebApplication Configure(this WebApplication app)
        {
            app.Environment.IsDevelopment();
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            if (app.Environment.IsDevelopment())
            {
                app.UseMigrationsEndPoint();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            var defaultFileOptions = new DefaultFilesOptions
            {
                RedirectToAppendTrailingSlash = false
            };
            app.UseDefaultFiles(defaultFileOptions);
            app.UseStaticFiles();

            app.UseRouting();

            if (app.Environment.IsDevelopment())
                app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.MapControllerRoute(
                name: "api",
                pattern: "api/{controller}/{action=Index}/{id?}");
            app.MapRazorPages();

            app.MapFallbackToFile("index.html");

            return app;
        }
        
        private static async Task RunWithTasksAsync(this WebApplication app)
        {
            var startupTasks = app.Services.GetServices<IStartupTask>();

            foreach (var startupTask in startupTasks)
            {
                await startupTask.ExecuteAsync();
            }

            await app.RunAsync();
        }
    }
}