﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.ApiModels
{
    public class PlayerAttendanceSummary
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int NumberOfAttendedSessions { get; set; }
    }
}
