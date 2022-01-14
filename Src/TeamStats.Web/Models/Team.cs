using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Models
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime DateRegistered { get; set; }

        public Guid ClubId { get; set; }
        public Club Club { get; set; }
    }
}
