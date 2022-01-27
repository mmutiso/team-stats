
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TeamStats.Core.Identity;

namespace IdentityServer
{
    public class CustomProfileService : IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsPrincipalFactory;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _usersDbContext;

        public CustomProfileService(IUserClaimsPrincipalFactory<ApplicationUser> claimsPrincipalFactory,
            UserManager<ApplicationUser> userManager, ApplicationDbContext usersDbContext)
        {
            _claimsPrincipalFactory = claimsPrincipalFactory;
            _userManager = userManager;
            _usersDbContext = usersDbContext;
        }
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            string sub = context.Subject.GetSubjectId();
            ApplicationUser user = await _userManager.FindByIdAsync(sub);
            var principal = await _claimsPrincipalFactory.CreateAsync(user);

            //context.IssuedClaims = principal.Claims.ToList();
            Claim givenNameClaim = principal.Claims.Where(x => x.Type == "given_name")
                                .FirstOrDefault();

            if (givenNameClaim is null)
                return;

            context.IssuedClaims.Add(givenNameClaim);
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            string sub = context.Subject.GetSubjectId();
            ApplicationUser user = await _userManager.FindByIdAsync(sub);

            context.IsActive = user != null;
        }
    }
}
