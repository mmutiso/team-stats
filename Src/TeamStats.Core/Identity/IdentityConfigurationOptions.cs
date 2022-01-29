using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamStats.Core.Identity
{
    public record IdentityConfigurationOptions
    {
        public string DefaultPassword { get; set; }
        public string Authority { get; set; }
    }
}
