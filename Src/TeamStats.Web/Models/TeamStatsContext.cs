using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Models
{
    public class TeamStatsContext : DbContext
    {
        public DbSet<Club> Clubs { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Person> People { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<PlayerAttendance> PlayerAttendances { get; set; }
        public DbSet<TeamMembership> TeamMemberships { get; set; }

        public TeamStatsContext(DbContextOptions<TeamStatsContext> options)
            :base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Team>(options =>
            {
                options
                .HasIndex(x => new { x.ClubId, x.Name })
                .IsUnique();
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSnakeCaseNamingConvention();

            
        }
    }
}
