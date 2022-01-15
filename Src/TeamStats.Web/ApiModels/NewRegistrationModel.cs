using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public record NewRegistrationModel
    {
        [Required]
        public string ManagerName { get; init; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(10)]
        public string PhoneNumber { get; set; }
        [Required]
        public string ClubName { get; set; }
    }
}
