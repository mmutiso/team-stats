using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public record ConfirmUserModel
    {
        [Required]
        public string Email { get; init; }
        [Required]
        public string Token { get; set; }
    }
}
