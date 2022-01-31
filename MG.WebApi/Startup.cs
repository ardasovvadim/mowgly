using MG.WebAPi.Config;
using MG.WebAPi.Database;
using MG.WebAPi.MockData;
using MG.WebAPi.Settings;
using MG.WebAPi.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

namespace MG.WebAPi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureBusinessServices(Configuration);
            
            services.AddControllers();

            services.AddCors(options => options.AddPolicy("AllowAllOrigins", builder =>
            {
                builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
            }));
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MG.WebAPi", Version = "v1" });
            });
            
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "../Web/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
                app.UseSwagger();
                
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MG.WebAPi v1"));

                var appSettingsOptions = app.ApplicationServices.GetService<IOptions<AppSettings>>();
                var appSettings = appSettingsOptions?.Value;
                var directoryUtils = app.ApplicationServices.GetService<IDirectoryUtils>();
                if (appSettings is { DeleteDatabaseOnRun: true })
                {
                    using var context = new MgContext(appSettingsOptions, directoryUtils);
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated(); 
                    TestDbData.Initialize(context);
                }
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            
            app.UseStaticFiles("/static");
            
            app.UseRouting();
            
            app.UseCors("AllowAllOrigins");

            if (!env.IsDevelopment())
                app.UseSpaStaticFiles();

            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "../Web";
                spa.Options.DefaultPage = "/";
                if (env.IsDevelopment())
                {
                    // spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
