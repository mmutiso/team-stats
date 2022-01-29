using IdentityModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TeamStats.Core.Identity;

namespace TeamStats.Web.Services
{
    public class CustomUserManager : IUserManager
    {
        ApplicationDbContext _dbContext;
        public CustomUserManager(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }    
        public async Task AddClaimsAsync(ApplicationUser user, string givenName)
        {
            var claim = new IdentityUserClaim<Guid>
            {
                ClaimType = JwtClaimTypes.GivenName,
                ClaimValue = givenName,
                UserId = user.Id
            };
            _dbContext.Add(claim);
            await _dbContext.SaveChangesAsync();
        }

        public async Task CreateAsync(ApplicationUser user, string password)
        {
            _dbContext.Add(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<ApplicationUser> FindByEmailAsync(string email)
        {
            var user = _dbContext.Users.Where(x => string.Equals(x.Email, email, StringComparison.OrdinalIgnoreCase))
                            .FirstOrDefault();

            await Task.CompletedTask;

            return user;
        }
    }
}
