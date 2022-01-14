using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Models
{
    public class PlayerAttendance
    {
        public Guid Id { get; set; }
        public Guid PlayerId { get; set; }
        public Guid AttendanceId { get; set; }
        
        public Attendance Attendance { get; set; }
        public Person Player { get; set; }
    }
}
