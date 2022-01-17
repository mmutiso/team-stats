using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Web.Services;

namespace TeamStats.Web.Controllers
{
    public class IdentityController : Controller
    {
        private readonly ILogger<IdentityController> _logger;
        private readonly IdentityService _identityService;

        public IdentityController(ILogger<IdentityController> logger, IdentityService identityService)
        {
            _logger = logger;
            _identityService = identityService;
        }

        [Route("identity")]
        [Authorize]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }

    }
}
