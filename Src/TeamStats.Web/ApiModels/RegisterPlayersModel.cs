using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public record RegisterPlayersModel
    {
        [Required]
        public List<string> Names { get; set; }
        [Required]
        public Guid TeamId { get; set; }
    }
}
