using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamStats.Core.Identity;

namespace TeamStats.UserApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfirmRegistrationController : Controller
    {
        private readonly RegisterationService _service;
        private readonly ApplicationDbContext _applicationDbContext;

        public ConfirmRegistrationController(RegisterationService registerationService,
            ApplicationDbContext applicationDbContext)
        {
            _service = registerationService;
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Confirm(ConfirmUserModel confirmUserModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(confirmUserModel);

            var registration = _applicationDbContext.ApplicationUserRegistrations
                                .Where(x => x.Email == confirmUserModel.Email)
                                .OrderByDescending(x => x.DateCreatedUtc)
                                .FirstOrDefault();

            if (registration == null)
                return NotFound(confirmUserModel);

            if (!string.Equals(registration.ConfirmationToken, confirmUserModel.Token, StringComparison.OrdinalIgnoreCase))
                return BadRequest(confirmUserModel);

            registration.Confirm();
            await _applicationDbContext.SaveChangesAsync();

            var user = await _service.CreateUserAsync(registration);

            return Ok(registration.Email);
        }

    }
}
