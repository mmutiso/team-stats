using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public class CreateUserModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; init; }
        [Required]
        public string Name { get; set; }
    }
}
