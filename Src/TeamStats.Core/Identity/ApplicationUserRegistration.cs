using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamStats.Core.Identity
{
    public class ApplicationUserRegistration
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public DateTime DateCreatedUtc { get; set; }
        public string ConfirmationToken { get; set; }
        public bool Confirmed { get; set; }
        public DateTime? DateConfirmedUtc { get; set; }
        

        public ApplicationUserRegistration()
        {

        }

        public ApplicationUserRegistration(string name, string email, string phoneNumber)
        {
            this.Name = name;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.Id = Guid.NewGuid();
            this.DateCreatedUtc = DateTime.UtcNow;
            this.ConfirmationToken = Guid.NewGuid().ToString().Replace("-", "");
            Confirmed = false;
        }

        public string GetGivenName()
        {
            return this.Name.Split(" ")[0];
        }

        public void Confirm()
        {
            this.DateConfirmedUtc = DateTime.UtcNow;
            this.Confirmed = true;
        }
    }
}
