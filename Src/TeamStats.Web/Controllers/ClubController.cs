using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TeamStats.Web.ApiModels;
using Microsoft.AspNetCore.Http;

namespace TeamStats.Web.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ClubController : Controller
    {
        private readonly ILogger<ClubController> _logger;

        public ClubController(ILogger<ClubController> logger)
        {
            _logger = logger;
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

            //Process input

            return Ok("details captured succesfully");
        }
    }
}
