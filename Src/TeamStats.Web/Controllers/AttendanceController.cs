using Microsoft.AspNetCore.Http;
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
    public class AttendanceController : Controller
    {
        private readonly ILogger<AttendanceController> _logger;
        private readonly TeamStatsContext _context;

        public AttendanceController(ILogger<AttendanceController> logger, TeamStatsContext context)
        {
            _logger = logger;
            _context = context;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(CaptureAttendanceModel captureAttendanceModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(captureAttendanceModel);
            }

            if(captureAttendanceModel.Players.Count == 0)
                return BadRequest(captureAttendanceModel);

            var attendance = new Attendance
            {
                Id = Guid.NewGuid(),
                DateRecorded = DateTime.Now,
                ForDate = captureAttendanceModel.Date,
                RecordedBy = User.Identity.Name
            };

            var playersAttendances = new List<PlayerAttendance>();
            foreach (var item in captureAttendanceModel.Players)
            {
                var playerAttendance = new PlayerAttendance
                {
                    Id = Guid.NewGuid(),
                    AttendanceId = attendance.Id,
                    PlayerId = item
                };
                playersAttendances.Add(playerAttendance);
            }
            _context.Add(attendance);
            _context.AddRange(playersAttendances);
            await _context.SaveChangesAsync();

            return Ok($"Attendance {playersAttendances.Count} captured succesfully");
        }

        [ProducesResponseType(typeof(List<PlayerAttendanceSummary>), StatusCodes.Status200OK)]
        public IActionResult Get(Guid? teamId)
        {
            var playersInTeam = _context.TeamMemberships
                        .Where(x => x.Player.Type == PersonType.Player)
                        .Select(x => new { x.PlayerId, x.TeamId });

            if (teamId.HasValue)
                playersInTeam = playersInTeam.Where(x => x.TeamId == teamId.Value);

            var playersIds = playersInTeam.Select(x => x.PlayerId);

            var attendances = _context.PlayerAttendances
                                .Where(x => playersIds.Contains(x.PlayerId))
                                .GroupBy(x => new { x.PlayerId, x.Player.Name })
                                .Select(x => new PlayerAttendanceSummary
                                {
                                    Id = x.Key.PlayerId,
                                    Name = x.Key.Name,
                                    NumberOfAttendedSessions = x.Count()
                                });


            return Ok(attendances);
        }
    }
}
