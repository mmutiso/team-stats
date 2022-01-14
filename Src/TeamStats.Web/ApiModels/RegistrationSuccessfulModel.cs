using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public record RegistrationSuccessfulModel
    {
        public Guid ManagerId { get; init; }
        public Guid ClubId { get; init; }
        public string ManagerName { get; init; }
        public string AuthToken { get; init; }
    }
}
