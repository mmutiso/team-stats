using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TeamStats.Web.ApiModels;
using Microsoft.AspNetCore.Http;
using TeamStats.Web.Models;
using Microsoft.AspNetCore.Authorization;
using TeamStats.Core.Identity;
using IdentityModel;
using Microsoft.EntityFrameworkCore;

namespace TeamStats.Web.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ClubController : Controller
    {
        private readonly ILogger<ClubController> _logger;
        private readonly TeamStatsContext _context;
        private readonly ApplicationDbContext _applicationDbContext;

        public ClubController(ILogger<ClubController> logger, TeamStatsContext context, ApplicationDbContext applicationDbContext)
        {
            _logger = logger;
            _context = context;
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult Register(ClubRegistrationModel clubRegistrationModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(clubRegistrationModel);
            }

            var club = new Club
            {
                Id = Guid.NewGuid(),
                Name = clubRegistrationModel.ClubName,
                DateRegistered = DateTime.UtcNow
            };

            var userEmail = User.Claims.Where(x => x.Type == JwtClaimTypes.Email)
                                .Select(x => x.Value)
                                .FirstOrDefault();

            var registrationDetails = _applicationDbContext.ApplicationUserRegistrations
                                        .Where(x => x.Email.ToLower() == userEmail.ToLower())
                                        .OrderByDescending(x=>x.DateCreatedUtc)
                                        .FirstOrDefault();

            if (registrationDetails == null)
                return NotFound(clubRegistrationModel);

            var person = new Person
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.UtcNow,
                Email = registrationDetails.Email,
                Name = registrationDetails.Name,
                PhoneNumber = registrationDetails.PhoneNumber,
                Type = PersonType.TeamManager,
                ClubId = club.Id
            };

            _context.Add(person);
            _context.Add(club);

            _context.SaveChanges();

            return Ok(new RegistrationSuccessfulModel
            {
                ManagerId = person.Id,
                ClubId = club.Id,
                ManagerName = person.Name
            });
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get(Guid clubId)
        {
            var club = _context.Clubs.Where(x => x.Id == clubId)
                .Include(x => x.Teams)
                .Select(x => new ClubDetailsModel
                {
                    ClubId = x.Id,
                    ClubName = x.Name,
                    Teams = x.Teams.Select(y => new TeamDetails
                    {
                        TeamId = y.Id,
                        TeamName = y.Name
                    }).ToList()
                })
                .FirstOrDefault();

            if(club == null)
                return NotFound(clubId);

            return Ok(club);
        }
    }
}
