using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Models
{
    public class Attendance
    {
        public Guid Id { get; set; }
        public DateTime DateRecorded { get; set; }
        public DateTime ForDate { get; set; }
        public string RecordedBy { get; set; }
    }
}
