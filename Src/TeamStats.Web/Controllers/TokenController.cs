using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Web.ApiModels;
using TeamStats.Web.Services;

namespace TeamStats.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : Controller
    {
        private readonly ILogger<TokenController> _logger;
        private readonly IdentityService _identityService;
        private readonly LoginService _loginService;

        public TokenController(ILogger<TokenController> logger, IdentityService identityService,
            LoginService loginService)
        {
            _logger = logger;
            _identityService = identityService;
            _loginService = loginService;
        }

        [Route("request")]
        [HttpGet]
        public async Task<IActionResult> RequestToken([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest(nameof(email));

            await _loginService.GenerateAndSendMagicLink(email);

            return Ok($"Login request email sent to {email}");
        }

        [Route("login")]
        [HttpGet]
        public async Task<IActionResult> Login([FromQuery] ConfirmUserLoginModel model)
        {
            if (string.IsNullOrEmpty(model.Email))
                return BadRequest(nameof(model.Email));

            var loginValid = await _loginService.ConfirmMagicLinkIsValid(model.Email, model.ConfirmationToken);
            
            if(!loginValid)
            {
                return BadRequest($"Invalid login request");
            }

            var token = await _identityService.RequestTokenAsync(model.Email);

            return Ok(token);
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
