using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class PlayersController : Controller
    {
        private readonly TeamStatsContext _context;
        private readonly ILogger<PlayersController> _logger;

        public PlayersController(ILogger<PlayersController> logger, TeamStatsContext context)
        {
            _logger = logger;
            _context = context;
        }

        [ProducesResponseType(typeof(List<PlayersModel>),StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get([FromQuery]GetPlayersModel getPlayersModel)
        {
            var query = _context.TeamMemberships.Where(x => x.Player.Type == PersonType.Player);

            if (getPlayersModel.TeamId.HasValue)
                query = query.Where(x => x.TeamId == getPlayersModel.TeamId.Value);

            var players = query.Select(x => new PlayersModel
            {
                Id = x.PlayerId,
                Name = x.Player.Name
            });

            return Ok(players);
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(RegisterPlayersModel registerPlayersModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(registerPlayersModel);
            }

            if (registerPlayersModel.Names.Count == 0)
                return BadRequest(registerPlayersModel);

            var teamCheck = _context.Teams
                .Include(x=>x.Club)
                .Where(x => x.Id == registerPlayersModel.TeamId)
                .FirstOrDefault();

            if (teamCheck is null)
                return NotFound(registerPlayersModel);

            var players = new List<Person>();
            var memberships = new List<TeamMembership>();
            foreach (var item in registerPlayersModel.Names)
            {
                var player = new Person
                {
                    Id = Guid.NewGuid(),
                    DateCreated = DateTime.UtcNow,
                    Name = item,
                    Type = PersonType.Player,
                    ClubId = teamCheck.Club.Id
                };
                players.Add(player);

                var membership = new TeamMembership
                {
                    Id = Guid.NewGuid(),
                    Active = true,
                    DateAdded = DateTime.UtcNow,
                    PlayerId = player.Id,
                    TeamId = registerPlayersModel.TeamId
                };
                memberships.Add(membership);
            }

            _context.AddRange(players);
            _context.AddRange(memberships);
            await _context.SaveChangesAsync();

            return Ok($"Registered {players.Count} players succesfully");
        }
    }
}
