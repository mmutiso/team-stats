using System;

namespace TeamStats.Core.Identity
{
    public class ApplicationUserLogin
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public DateTime? DateRequestedUtc { get; set; }
        public string ConfirmationToken { get; set; }
        public DateTime? DateLoggedIn { get; set; }

        public ApplicationUserLogin() { }

        public ApplicationUserLogin(string email)
        {
            this.Id = Guid.NewGuid();
            this.Email = email;
            this.DateRequestedUtc = DateTime.UtcNow;
            this.ConfirmationToken = Guid.NewGuid().ToString().Replace("-", "");
        }
    }
}