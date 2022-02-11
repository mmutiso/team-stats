using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web
{
    public record RuntimeConfigs
    {
        public string CreateUserAPIEndpoint { get; init; }
        public string Authority { get; init; }
        public string DefaultPassword { get; init; }
        public string SymmetricKey { get; init; }
        public string ClientId { get; init; }
        public string ClientSecret { get; init; }
        public string Scopes { get; init; }
    }
}
