using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public record ClubDetailsModel
    {
        public Guid ClubId { get; init; }
        public string ClubName { get; init; }
        public List<TeamDetails> Teams { get; init; }
    }

    public record TeamDetails
    {
        public Guid TeamId { get; init; }
        public string TeamName { get; set; }
    }
}
