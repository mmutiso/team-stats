using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamStats.Web.Models
{
    public class Person
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public PersonType Type { get; set; }
        public DateTime DateCreated { get; set; }
        public string Email { get; set; }

    }
}
