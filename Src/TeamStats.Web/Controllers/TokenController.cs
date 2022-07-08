using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Web.Services;

namespace TeamStats.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : Controller
    {
        private readonly ILogger<TokenController> _logger;
        private readonly IdentityService _identityService;

        public TokenController(ILogger<TokenController> logger, IdentityService identityService)
        {
            _logger = logger;
            _identityService = identityService;
        }

        [HttpGet]
        [Route("refresh")]
        public async Task<IActionResult> Refresh(string refreshToken)
        {
            var token = await _identityService.RequestTokenWithRefreshToken(refreshToken);

            return Ok(token);
        }
    }
}
