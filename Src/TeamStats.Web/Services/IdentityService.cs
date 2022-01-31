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
using TeamStats.Web.ApiModels;
using System.Text.Json;
using Microsoft.Net.Http.Headers;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace TeamStats.Web.Services
{
    public class IdentityService
    {
        private readonly RuntimeConfigs _configurationOptions;
        IHttpClientFactory _httpClientFactory;
        public IdentityService( IOptions<RuntimeConfigs> configurationOptions, IHttpClientFactory httpClientFactory)
        {
            _configurationOptions = configurationOptions.Value;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<JsonElement> CreateUserAsync(ConfirmUserModel confirmUserModel)
        {
            HttpClient httpClient = _httpClientFactory.CreateClient();
            StringContent body = new StringContent(JsonSerializer.Serialize(confirmUserModel), Encoding.UTF8, Application.Json);
            var requestMessage = new HttpRequestMessage(HttpMethod.Post, _configurationOptions.CreateUserAPIEndpoint)
            {
                Headers =
                {
                    { HeaderNames.Authorization, _configurationOptions.SymmetricKey }
                },
                 Content = body
            };


            var result = await httpClient.SendAsync(requestMessage);
            result.EnsureSuccessStatusCode();

            string username = await result.Content.ReadAsStringAsync();
            JsonElement token = await RequestTokenAsync(username);

            return token;
        }
        public async Task<JsonElement> RequestTokenAsync(string username)
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