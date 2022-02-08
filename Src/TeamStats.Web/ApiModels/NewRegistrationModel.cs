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
        public string ClubName { get; set; }
    }
}
