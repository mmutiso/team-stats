using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Core.Identity;
using TeamStats.Web.ApiModels;
using TeamStats.Web.Services;

namespace TeamStats.Web.Controllers
{
    public class IdentityController : Controller
    {
        private readonly ILogger<IdentityController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityController(ILogger<IdentityController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        [Route("identity")]
        [Authorize]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }


      
    }
}
