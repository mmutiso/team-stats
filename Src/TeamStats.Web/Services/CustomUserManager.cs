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
        public Task AddClaimsAsync(ApplicationUser user, Claim[] claims)
        {
            throw new NotImplementedException();
        }

        public Task CreateAsync(ApplicationUser user, string password)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUser> FindByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }
    }
}
