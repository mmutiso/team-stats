using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Web.Services;

namespace TeamStats.Web.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IdentityService _identityService;

        public LoginController(ILogger<LoginController> logger, IdentityService identityService)
        {
            _logger = logger;
            _identityService = identityService;
        }

        [HttpGet]
        [Route("login")]
        public async Task<IActionResult> Get()
        {
            var token = await _identityService.RequestTokenAsync();

            return Ok(token);
        }
    }
}
