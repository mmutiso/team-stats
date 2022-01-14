using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Web.ApiModels;
using TeamStats.Web.Models;

namespace TeamStats.Web.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TeamController : Controller
    {
        private readonly ILogger<TeamController> _logger;
        private readonly TeamStatsContext _context;

        public TeamController(ILogger<TeamController> logger, TeamStatsContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(RegisterTeamsModel registerTeamsModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(registerTeamsModel);
            }

            if (registerTeamsModel.Teams.Count == 0)
                return BadRequest(registerTeamsModel);

            var exists = _context.Clubs.Where(x => x.Id == registerTeamsModel.ClubId).Any();
            if (!exists)
                return NotFound($"Club with id {registerTeamsModel.ClubId} not found");

            foreach (string item in registerTeamsModel.Teams)
            {
                var team = new Team
                {
                    Id = Guid.NewGuid(),
                    Name = item,
                    ClubId = registerTeamsModel.ClubId,
                    DateRegistered = DateTime.UtcNow
                };
                _context.Add(team);
            }

            await _context.SaveChangesAsync();

            return Ok($"registered {registerTeamsModel.Teams.Count} teams");
        }


        [HttpGet]
        public IActionResult Get(Guid clubId)
        {
            if (!_context.Clubs.Where(x => x.Id == clubId).Any())
                return NotFound(clubId);

            var teams = _context.Teams.Where(x => x.ClubId == clubId);

            return Ok(teams);
        }
    }
}
