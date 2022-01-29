using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TeamStats.Core.Identity;

namespace TeamStats.Web.Services
{
    public interface IUserManager
    {
        Task<ApplicationUser> FindByEmailAsync(string email);
        Task CreateAsync(ApplicationUser user, string password);
        Task AddClaimsAsync(ApplicationUser user, Claim[] claims);
    }
}
