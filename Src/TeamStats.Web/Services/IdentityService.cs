using IdentityModel.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace TeamStats.Web.Services
{
    public class IdentityService
    {
        public async Task<object> RequestTokenAsync()
        {
            HttpClient httpClient = new HttpClient();
            var disco = await httpClient.GetDiscoveryDocumentAsync("http://localhost:5000");

            if (disco.IsError)
                throw new Exception(disco.Error);

            var tokenResponse = await httpClient.RequestPasswordTokenAsync(new PasswordTokenRequest
            {
                Address = disco.TokenEndpoint,
                ClientId = "team-stats-web-api",
                ClientSecret = "secret",
                UserName = "alice",
                Password = "Pass123$",
                Scope = "openid profile"
            });

            if (tokenResponse.IsError)
                throw new Exception(tokenResponse.Error);

            return tokenResponse.Json;
        }
    }
}
