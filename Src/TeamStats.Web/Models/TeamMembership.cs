using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Models
{
    public class TeamMembership
    {
        public Guid Id {get;set;}
        public Guid PlayerId { get; set; }
        public Guid TeamId { get; set; }

        public bool Active { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateRemoved { get; set; }

        public Team Team { get; set; }
        public Person Player { get; set; }
    }
}
