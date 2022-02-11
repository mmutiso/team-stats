using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamStats.UserApi
{
    public record IdentityConfigurationOptions
    {
        public string DefaultPassword { get; init; }
        public string Authority { get; init; }
        public string SymmetricKey { get; init; }
    }
}
