using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace TeamStats.Core.Identity
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public DbSet<ApplicationUserRegistration> ApplicationUserRegistrations { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
           
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSnakeCaseNamingConvention();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            builder.Entity<ApplicationUserRegistration>(x =>
            {
                x.HasKey(y => y.Id);
                x.ToTable("application_user_registrations");
            });

            //Identity models do not follow the convention to use camel case. I have  to set this manually
            // here using a suggestion from this github thread
            // https://github.com/efcore/EFCore.NamingConventions/issues/2

            /*
            builder.Entity<ApplicationUser>().ToTable("asp_net_users");
            builder.Entity<IdentityUserToken<Guid>>().ToTable("asp_net_user_tokens");
            builder.Entity<IdentityUserLogin<string>>().ToTable("asp_net_user_logins").HasKey(x=>x.UserId);
            builder.Entity<IdentityUserClaim<int>>().ToTable("asp_net_user_claims");
            builder.Entity<IdentityRole<Guid>>().ToTable("asp_net_roles");
            builder.Entity<IdentityUserRole<Guid>>().ToTable("asp_net_user_roles").HasKey(x => new { x.RoleId, x.UserId });
            builder.Entity<IdentityRoleClaim<int>>().ToTable("asp_net_role_claims");
            */
            
        }
    }
}
