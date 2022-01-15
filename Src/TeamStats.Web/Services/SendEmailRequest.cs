using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Services
{
    public record SendEmailRequest(string email, string content);
}
