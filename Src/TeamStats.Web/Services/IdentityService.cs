using IdentityModel;
using IdentityModel.Client;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TeamStats.Core.Identity;
using Microsoft.Extensions.Options;

namespace TeamStats.Web.Services
{
    public class IdentityService
    {
        private readonly IUserManager _userManager;
        private readonly IdentityConfigurationOptions _configurationOptions;
        public IdentityService(IUserManager userManager, IOptions<IdentityConfigurationOptions> configurationOptions)
        {
            _configurationOptions = configurationOptions.Value;
            _userManager = userManager;
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
            
            await _userManager.CreateAsync(user, _configurationOptions.DefaultPassword);

            await _userManager.AddClaimsAsync(user, new System.Security.Claims.Claim[]
                {
                      new System.Security.Claims.Claim(JwtClaimTypes.GivenName, identityUserModel.GetGivenName()),
                });

            return user;
        }

        public async Task<object> RequestTokenAsync(string username)
        {
            HttpClient httpClient = new HttpClient();
            var disco = await httpClient.GetDiscoveryDocumentAsync(_configurationOptions.Authority);

            if (disco.IsError)
                throw new Exception(disco.Error);

            var tokenResponse = await httpClient.RequestPasswordTokenAsync(new PasswordTokenRequest
            {
                Address = disco.TokenEndpoint,
                ClientId = "team-stats-web-api",
                ClientSecret = "secret",
                UserName =username,
                Password = _configurationOptions.DefaultPassword,
                Scope = "openid profile"
            });

            if (tokenResponse.IsError)
                throw new Exception(tokenResponse.Error);

            return tokenResponse.Json;
        }
    }
}
