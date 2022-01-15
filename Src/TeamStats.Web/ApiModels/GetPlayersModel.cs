using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public record GetPlayersModel
    {
        public Guid? TeamId { get; set; }
    }
}
