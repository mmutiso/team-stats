using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public record CaptureAttendanceModel
    {
        public DateTime Date { get; set; }
        public List<Guid> Players { get; set; }
    }
}
