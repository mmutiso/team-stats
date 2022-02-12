using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web
{
    public record EmailSettings
    {
        public EmailSettings()
        {

        }
        public EmailSettings(string username, string password)
        {
            Username = username;
            Password = password;
        }
        public string Username { get; init; }
        public string Password { get; init; }
        public int Port => 587;
        public string Gateway => "smtp.gmail.com";
    }
}
