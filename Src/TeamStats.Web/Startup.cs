using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using TeamStats.Core.Identity;
using TeamStats.Web.Models;
using TeamStats.Web.Services;

namespace TeamStats.Web
{
    public class Startup
    {
        string _reactAppCors = "_reactAppCors";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddCors(options =>
            {
                options.AddPolicy(name: _reactAppCors,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000");
                    });
            });

            services.AddControllers();

            services.AddAuthorization();
            services.AddHttpClient();


            services.Configure<RuntimeConfigs>(Configuration.GetSection("RuntimeConfigs"));

            string identityServerEndpoint = Configuration.GetValue<string>("RuntimeConfigs:Authority");

            if (string.IsNullOrEmpty(identityServerEndpoint))
                throw new Exception("Identity server endpoint not loaded");

            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = identityServerEndpoint;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false,
                        NameClaimType = "given_name",
                         ClockSkew = TimeSpan.FromMinutes(5),
                          
                    };
                    
                    options.RequireHttpsMetadata = false;
                });

            services.AddDbContext<TeamStatsContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("TeamStatsContext"));
                options.UseSnakeCaseNamingConvention();
            });
            services.AddScoped<IdentityService>();

            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));


            services.Configure<PasswordHasherOptions>(options =>
            {
                options.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV3;
            });

            services.AddScoped<IPasswordHasher<ApplicationUser>, PasswordHasher<ApplicationUser>>();
            services.AddSwaggerGen();
            // In production, the React files will be served from this directory
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/build";
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
            //    //app.UseDeveloperExceptionPage();

            //}
            //else
            //{
            //    app.UseExceptionHandler("/Error");
            //}
            app.UseExceptionHandler("/error");

            //app.UseStaticFiles();
            //app.UseSpaStaticFiles();

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseRouting();
            app.UseCors(_reactAppCors);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            //app.UseSpa(spa =>
            ////{
            //    spa.Options.SourcePath = "ClientApp";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseReactDevelopmentServer(npmScript: "start");
            //    }
            //});
        }
    }
}
