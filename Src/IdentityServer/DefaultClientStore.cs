using IdentityServer4.Models;
using IdentityServer4.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer
{
    public class DefaultClientStore : IClientStore
    {
        public async Task<Client> FindClientByIdAsync(string clientId)
        {
            Client client = new Client
            {
                ClientId = "trading-service",
                ClientName = "Trading Service",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                AllowedScopes =
                {
                    "openid", "profile", "address", "email", "phone", "write", "read", "trade", "admin"
                }
            };

            await Task.CompletedTask;

            return client;
        }
    }
}
