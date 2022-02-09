using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public record ClubRegistrationModel
    {
        [Required]
        public string ClubName { get; set; }

        [Required]
        public List<string> Teams { get; set; }
    }
}
