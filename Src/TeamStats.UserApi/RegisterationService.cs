using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Core.Identity;

namespace TeamStats.UserApi
{
    public class RegisterationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IdentityConfigurationOptions _configurationOptions;
        public RegisterationService(UserManager<ApplicationUser> userManager, IOptions<IdentityConfigurationOptions> configurationOptions)
        {
            _userManager = userManager;
            _configurationOptions = configurationOptions.Value;
        }

        public async Task<ApplicationUser> CreateUserAsync(ApplicationUserRegistration identityUserModel)
        {
            var user = await _userManager.FindByEmailAsync(identityUserModel.Email);
            if (user != null)
                return user;

            user = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = identityUserModel.Email,
                Email = identityUserModel.Email,
                PhoneNumber = identityUserModel.PhoneNumber,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, _configurationOptions.DefaultPassword);
            if (!result.Succeeded)
                throw new Exception(result.Errors.First().Description);

            result = await _userManager.AddClaimsAsync(user, new System.Security.Claims.Claim[]
            {
                new System.Security.Claims.Claim(JwtClaimTypes.GivenName, identityUserModel.GetGivenName()),
                new System.Security.Claims.Claim(JwtClaimTypes.Email, identityUserModel.Email)
            });
            if (!result.Succeeded)
                throw new Exception(result.Errors.First().Description);

            return user;
        }


    }
}
