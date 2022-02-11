using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Services
{
    public record SendEmailRequest
    {
        public string From { get; init; }
        public string To { get; init; }
        public string Subject { get; init; }
        public string Body { get; init; }

    }
}
