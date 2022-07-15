using System;
using System.Threading.Tasks;
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


        public LoginService(TeamStatsContext context, IdentityService identityService)
        {
            _applicationDbContext = applicationDbContext;
            _identityService = identityService;
            _emailSender = emailSender;
            _emailRequestFactory = emailRequestFactory;
            _logger = logger;
        }

        public async Task GenerateAndSendMagicLink(string email)
        {
            var userExists = _applicationDbContext.ApplicationUserRegistration.Where(x => x.Email == email).Any();

            if (!userExists)
            {
                _logger.Warning($"User with email ${email} does not exist.");
                return;
            }

            _logger.LogInformation("Generating magic link.");

            var loginRequest = new ApplicationUserLogin(email);

            var request = _emailRequestFactory.CreateForTokenConfirmation(email, loginRequest.ConfirmationToken);

            _applicationDbContext.Add(loginRequest);
            _applicationDbContext.SaveChangesAsync();

            await _emailSender.SendEmailAsync(request);

            _logger.LogInformation($"The magic link has been sent to {email}");
        }
        public async Task<bool> ConfirmationMagicLinkIsValid(string email, string confirmationToken)
        {
            await Task.CompletedTask;

            throw new NotImplementedException();
        }
    }
}