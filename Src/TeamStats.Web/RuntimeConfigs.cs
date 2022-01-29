using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web
{
    public record RuntimeConfigs
    {
        public string UserAPIEndpoint { get; init; }
        public string Authority { get; init; }
        public string DefaultPassword { get; set; }
    }
}
