using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public class RegisterTeamsModel
    {
        [Required]
        public Guid ClubId { get; set; }


        [Required]
        public List<string> Teams { get; set; }
    }
}
