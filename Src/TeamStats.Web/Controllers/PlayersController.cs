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
    [ApiController]
    [Route("[controller]")]
    public class PlayersController : Controller
    {

        private readonly ILogger<PlayersController> _logger;
        public PlayersController(ILogger<PlayersController> logger)
        {
            _logger = logger;
        }

        [ProducesResponseType(typeof(List<PlayersModel>),StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get([FromQuery]GetPlayersModel getPlayersModel)
        {
            await Task.CompletedTask;


            //perform fetch

            return View();
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(RegisterPlayersModel registerPlayersModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(registerPlayersModel);
            }

            await Task.CompletedTask;

            //process input

            return Ok("Registered players succesfully");
        }
    }
}
