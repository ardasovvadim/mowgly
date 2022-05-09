using Duende.IdentityServer.Services;
using MG.WebHost.Config;
using MG.WebHost.Database;
using MG.WebHost.Entities.Users;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;

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

builder.Services.AddDefaultIdentity<User>(options =>
    {
        options.SignIn.RequireConfirmedAccount = true;
    })
    .AddEntityFrameworkStores<MgContext>();

builder.Services.AddSingleton<ICorsPolicyService>((container) => {
    var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
    return new DefaultCorsPolicyService(logger) {
        // todo: not for production
        AllowedOrigins =
        {
            "http://localhost:4200",
        }
    };
});

builder.Services.AddIdentityServer()
    .AddApiAuthorization<User, MgContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

if (builder.Environment.IsProduction())
    builder.Services.Configure<JwtBearerOptions>(
        IdentityServerJwtConstants.IdentityServerJwtBearerScheme, 
        options => options.Authority = builder.Configuration["Authority"]);

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

const string MyAllowSpecificOrigins = "MyAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.DefaultPolicyName = MyAllowSpecificOrigins;
    options
        .AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy
                .WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod()
                ;
        });
});

builder.Services.ConfigureBusinessServices(builder.Configuration);

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

// Configure the HTTP request pipeline.
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

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "api",
    pattern: "api/{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
