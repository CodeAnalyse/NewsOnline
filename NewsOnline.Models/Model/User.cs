using NewsOnline.Models.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Models
{
	public class User
	{
		public int Id { get; set; }
		public string Username { get; set; }

		public string Email { get; set; }

		public string Password { get; set; }

		public string Type { get; set; }

		public int StatusId { get; set; }

		public string Token { get; set; }
	}
}
