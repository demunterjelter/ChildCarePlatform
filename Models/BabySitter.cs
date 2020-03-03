using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChildCarePlatform.Models
{
    public class BabySitter
    {
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string LastName { get; set; }
		[Required]
		public string PhoneNumber { get; set; }
		[Required]
		public string Age { get; set; }
		public virtual ICollection<Customer> Customers { get; set; }
		
	}
}
