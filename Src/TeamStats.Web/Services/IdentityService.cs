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
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RuntimeConfigs _configurationOptions;
        public IdentityService(UserManager<ApplicationUser> userManager, IOptions<RuntimeConfigs> configurationOptions)
        {
            _userManager = userManager;
            _configurationOptions = configurationOptions.Value;
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
                UserName = username,
                Password = _configurationOptions.DefaultPassword,
                Scope = "openid profile"
            });

            if (tokenResponse.IsError)
                throw new Exception(tokenResponse.Error);

            return tokenResponse.Json;
        }
    }
}