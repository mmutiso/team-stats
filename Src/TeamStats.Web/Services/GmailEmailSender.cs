using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace TeamStats.Web.Services
{
    public class GmailEmailSender : IEmailSender
    {
        EmailSettings _emailSettings;
        public GmailEmailSender(EmailSettings emailSettings)
        {
            _emailSettings = emailSettings;
        }
        public async Task SendEmailAsync(SendEmailRequest sendEmailRequest)
        {
            var client = new SmtpClient(_emailSettings.Gateway)
            {
                Port = _emailSettings.Port,
                Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
                EnableSsl = true
            };

            MailAddress from = new MailAddress(_emailSettings.Username, "Team Performance");
            MailAddress to = new MailAddress(sendEmailRequest.To);
            MailMessage mail = new MailMessage(from, to);
            mail.Subject = sendEmailRequest.Subject;
            mail.Body = sendEmailRequest.Body;
            mail.IsBodyHtml = false;

            try
            {
                await client.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                
            }
            
            
        }
    }
}
