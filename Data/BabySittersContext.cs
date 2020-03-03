using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ChildCarePlatform.Models;

namespace ChildCarePlatform.Models
{
    public class BabySittersContext : DbContext
    {
        public BabySittersContext (DbContextOptions<BabySittersContext> options)
            : base(options)
        {
        }

        public DbSet<ChildCarePlatform.Models.BabySitter> BabySitter { get; set; }

        public DbSet<ChildCarePlatform.Models.Customer> Customer { get; set; }

        public DbSet<ChildCarePlatform.Models.Child> Child { get; set; }

        
        
    }
}
