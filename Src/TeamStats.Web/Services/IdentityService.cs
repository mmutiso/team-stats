﻿using IdentityModel.Client;
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
                ClientId = "api1",
                ClientSecret = "secret",
                UserName = "bob",
                Password = "Pass123$",
                Scope = "profile"
            }) ;

            if (tokenResponse.IsError)
                throw new Exception(tokenResponse.Error);

            return tokenResponse.Json;
        }
    }
}
