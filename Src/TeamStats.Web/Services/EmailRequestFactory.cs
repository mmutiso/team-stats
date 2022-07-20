using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Options;

namespace TeamStats.Web.Services
{
    public class EmailRequestFactory
    {
        EmailSettings _emailSettings;
        RuntimeConfigs _runtimeConfigs;

        public EmailRequestFactory(EmailSettings emailSettings, IOptions<RuntimeConfigs>  runtimeConfigs)
        {
            _emailSettings = emailSettings;
            _runtimeConfigs = runtimeConfigs.Value;
        }

        public SendEmailRequest CreateForTokenConfirmation(string recipient, string token, string action)
        {
            var subject = "Team stats - Registration Confirmation";
            var body = $"{_runtimeConfigs.UIAppBaseUrl}/registration?Email={recipient}&Token={token}";

            if (action == "login")
            {
                subject = "Team stats - Login Confirmation";
                body = $"{_runtimeConfigs.UIAppBaseUrl}/login?Email={recipient}&Token={token}";
            }

            var request = new SendEmailRequest
            {
                From = _emailSettings.Username,
                To = recipient,
                Subject = subject,
                Body = body,
               
            };

            return request;
        }
        
    }
}
