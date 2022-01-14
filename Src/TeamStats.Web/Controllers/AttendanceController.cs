using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Web.ApiModels;

namespace TeamStats.Web.Controllers
{
    public class AttendanceController : Controller
    {
        private readonly ILogger<AttendanceController> _logger;

        public AttendanceController(ILogger<AttendanceController> logger)
        {
            _logger = logger;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(CaptureAttendanceModel captureAttendanceModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(captureAttendanceModel);
            }

            await Task.CompletedTask;

            //process attendance

            return Ok("Attendance captured succesfully");
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(Guid? teamId)
        {
            //do processing. 
            await Task.CompletedTask;

            return default;
        }
    }
}
