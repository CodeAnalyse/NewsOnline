using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Models.Model
{
	public class Publication
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public int SelectedCountry { get; set; }

		public int SelectedState { get; set; }

		public int SelectedCity { get; set; }

		public int SelectedCategory { get; set; }

		public int StatusId { get; set; }

		public int UserId { get; set; }
	}
}
