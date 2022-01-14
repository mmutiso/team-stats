using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TeamStats.Web.ApiModels;
using Microsoft.AspNetCore.Http;
using TeamStats.Web.Models;

namespace TeamStats.Web.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ClubController : Controller
    {
        private readonly ILogger<ClubController> _logger;
        private readonly TeamStatsContext _context;

        public ClubController(ILogger<ClubController> logger, TeamStatsContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Register(NewRegistrationModel newRegistrationModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(newRegistrationModel);
            }

            var club = new Club
            {
                Id = Guid.NewGuid(),
                Name = newRegistrationModel.ClubName
            };
            var person = new Person
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.UtcNow,
                Email = newRegistrationModel.Email,
                Name = newRegistrationModel.ManagerName,
                PhoneNumber = newRegistrationModel.PhoneNumber,
                Type = PersonType.TeamManager
            };

            _context.Add(person);
            _context.Add(club);
            _context.SaveChanges();

            //authenticate and return token

            return Ok(new RegistrationSuccessfulModel
            {
                ManagerId = person.Id,
                ClubId = club.Id,
                ManagerName = person.Name
            });
        }
    }
}
