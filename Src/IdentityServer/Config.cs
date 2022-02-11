// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
                   new IdentityResource[]
                   {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Address(),
                new IdentityResources.Email(),
                new IdentityResources.Phone()
                   };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("team-stats-id", "Team Stats Id"),
            };

        //public static IEnumerable<Client> Clients =>
        //    new Client[]
        //    {
        //        // m2m client credentials flow client
        //        new Client
        //        {
        //            ClientId = "userService",
        //            ClientName = "User Service Client",

        //            AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

        //            ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },
        //            all
        //            AllowedScopes =
        //            {
        //                "openid", "profile", "read"}
        //            },
        //           }
        //        // interactive client using code flow + pkce
        //        new Client
        //        {
        //            ClientId = "interactive",
        //            ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },

        //            AllowedGrantTypes = GrantTypes.Code,

        //            RedirectUris = { "https://localhost:44300/signin-oidc" },
        //            FrontChannelLogoutUri = "https://localhost:44300/signout-oidc",
        //            PostLogoutRedirectUris = { "https://localhost:44300/signout-callback-oidc" },

        //            AllowOfflineAccess = true,
        //            AllowedScopes = { "openid", "profile", "scope2" }
        //        },
        //         // interactive ASP.NET Core MVC client
        //        new Client
        //        {
        //            ClientId = "mvc",
        //            ClientSecrets = { new Secret("4330d2da-4a9e-46ff-8b6c-2c7c8ec1cb10".Sha256()) },

        //            AllowedGrantTypes = GrantTypes.Code,

        //            // where to redirect to after login
        //            RedirectUris = { "https://localhost:5002/signin-oidc" },

        //            // where to redirect to after logout
        //            PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" },

        //            AllowedScopes = new List<string>
        //            {
        //                "openid",
        //                "profile"
        //            }
        //        }
        //    };
    }
}