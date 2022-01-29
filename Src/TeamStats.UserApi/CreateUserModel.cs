using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Core.Identity;

namespace TeamStats.UserApi
{
    public class CreateUserModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; init; }
        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        public string PhoneNumber { get; set; }

        public ApplicationUserRegistration CreateRegistration()
        {
            var registration = new ApplicationUserRegistration(Name, Email, PhoneNumber);

            return registration;
        }
    }
}
