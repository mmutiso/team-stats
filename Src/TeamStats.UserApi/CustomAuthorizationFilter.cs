using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace TeamStats.UserApi
{
    public class CustomAuthorizationFilter : IAuthorizationFilter
    {
        IdentityConfigurationOptions _options;
        public CustomAuthorizationFilter(IOptions<IdentityConfigurationOptions> options)
        {
            _options = options.Value;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var headers = context.HttpContext.Request.Headers;
            StringValues value;
            bool found = headers.TryGetValue(HeaderNames.Authorization, out value);
            if (!found)
                context.Result = new ForbidResult();

            if (value.ToString() != _options.SymmetricKey)
                context.Result = new ForbidResult();
        }
    }
}
