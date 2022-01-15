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
        public async Task RequestTokenAsync()
        {
            HttpClient httpClient = new HttpClient();
            var disco = await httpClient.GetDiscoveryDocumentAsync("http://localhost://5000");

            if (disco.IsError)
                return;

            var tokenClient = new TokenClient(disco.TokenEndpoint, "client", "secret",);
        }
    }
}
