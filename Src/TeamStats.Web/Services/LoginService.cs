using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TeamStats.Core.Identity;
using TeamStats.Web.Models;

namespace TeamStats.Web.Services
{
    public class LoginService
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IdentityService _identityService;
        private readonly IEmailSender _emailSender;
        private readonly EmailRequestFactory _emailRequestFactory;
        private readonly ILogger<LoginService> _logger;


        public LoginService(TeamStatsContext context, IdentityService identityService,
            ApplicationDbContext applicationDbContext, IEmailSender emailSender,
            ILogger<LoginService> logger, EmailRequestFactory emailRequestFactory)
        {
            _applicationDbContext = applicationDbContext;
            _identityService = identityService;
            _emailSender = emailSender;
            _emailRequestFactory = emailRequestFactory;
            _logger = logger;
        }

        public async Task GenerateAndSendMagicLink(string email)
        {
            var userExists = _applicationDbContext.ApplicationUserRegistrations
                             .Where(x => x.Email == email).Any();

            if (!userExists)
            {
                _logger.LogWarning($"User with email ${email} does not exist.");
                return;
            }

            _logger.LogInformation("Generating magic link.");

            var loginRequest = new ApplicationUserLogin(email);

            await _applicationDbContext.AddAsync(loginRequest);
            await _applicationDbContext.SaveChangesAsync();

            var request = _emailRequestFactory.CreateForTokenConfirmation(email, loginRequest.ConfirmationToken, action: "login");
            Console.WriteLine($"Request: {request}");

            await _emailSender.SendEmailAsync(request);

            _logger.LogInformation($"The magic link has been sent to {email}");
        }

        public async Task<bool> ConfirmMagicLinkIsValid(string email, string confirmationToken)
        {
          
            var user = _applicationDbContext.ApplicationUserLogins
                            .Where(x => x.Email == email && x.ConfirmationToken == confirmationToken)
                            .FirstOrDefault();

            if(user == null)
            {
                _logger.LogWarning($"User with email ${email} does not exist.");
                return false;
            }

            user.DateLoggedIn = DateTime.UtcNow;

            await _applicationDbContext.SaveChangesAsync();

            return true;
        }
    }
}