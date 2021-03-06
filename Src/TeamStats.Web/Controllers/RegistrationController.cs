using Microsoft.AspNetCore.Http;
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
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : Controller
    {
        private readonly ILogger<RegistrationController> _logger;
        private readonly IdentityService _identityService;
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IEmailSender _emailSender;
        private readonly EmailRequestFactory _emailRequestFactory;

        public RegistrationController(ILogger<RegistrationController> logger, IdentityService identityService,
            ApplicationDbContext applicationDbContext, IEmailSender emailSender, EmailRequestFactory emailRequestFactory)
        {
            _logger = logger;
            _identityService = identityService;
            _applicationDbContext = applicationDbContext;
            _emailSender = emailSender;
            _emailRequestFactory = emailRequestFactory;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest )]
        [ProducesResponseType(StatusCodes.Status200OK )]
        public async Task<IActionResult> Create(CreateUserModel createUserModel) 
        {
            if (!ModelState.IsValid)
                return BadRequest(createUserModel);

            var registration = createUserModel.CreateRegistration();
            _applicationDbContext.Add(registration);
            await _applicationDbContext.SaveChangesAsync();

            //Send email to user with token
            var request = _emailRequestFactory.CreateForTokenConfirmation(createUserModel.Email, registration.ConfirmationToken);
            await _emailSender.SendEmailAsync(request);            

            return Ok($"confirmation email send to {createUserModel.Email}");
        }

        public async Task<IActionResult> ConfirmUser([FromQuery]ConfirmUserModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(model);
            }

            var result = await _identityService.CreateUserAsync(model);

            return Ok(result);
        }
       
    }
}
