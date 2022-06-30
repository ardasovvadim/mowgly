using System.Text;
using MG.WebHost.Config;
using MG.WebHost.Database;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Users;
using MG.WebHost.Security;
using MG.WebHost.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

            builder.Services
                .AddIdentity<User, Role>(options =>
                {
                    options.SignIn.RequireConfirmedAccount = true;
                    options.User.RequireUniqueEmail = false;
                    options.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<MgContext>()
                .AddTokenProvider<TelegramTokenProvider>(TelegramTokenProvider.ProviderName);

            var jwtSettings = builder.Configuration.GetSection("JwtSettings");
            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["ValidIssuer"],
                    ValidAudience = jwtSettings["ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetSection("securityKey").Value))
                };
            });

            builder.Services.AddAuthorization(options =>
            {
                foreach (var perm in MgPermissions.GetPermissions())
                    options.AddPolicy(perm, c => c.RequireClaim(MgClaim.Permission, perm));
            });

            builder.Services.AddDistributedMemoryCache();

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
            using var scope = app.Services.CreateScope();
            var sp = scope.ServiceProvider;
            var logger = sp.GetRequiredService<ILogger<IHostLifetime>>();
            
            logger.LogInformation("Environment: {env}", app.Environment.EnvironmentName);
            
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
            app.UseMiddleware<PermissionsMiddleware>();
            app.UseAuthorization();

            app.MapControllerRoute(
                name: "api",
                pattern: "api/{controller}/{action=Index}/{id?}");
            app.MapRazorPages();

            app.MapFallbackToFile("404.html");

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