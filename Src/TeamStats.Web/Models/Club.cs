using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Models
{
    public class Club
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime DateRegistered { get; set; }

        public ICollection<Team> Teams { get; set; }
    }
}
