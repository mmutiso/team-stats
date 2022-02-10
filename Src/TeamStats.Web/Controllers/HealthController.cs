using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class HealthController : Controller
    {
        [Route("index")]
        public IActionResult Index()
        {
            return Ok(DateTime.Now.ToString());
        }

    }
}
