using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Services
{
    public interface IEmailSender
    {
        public Task SendEmail(SendEmailRequest sendEmailRequest);
    }
}
