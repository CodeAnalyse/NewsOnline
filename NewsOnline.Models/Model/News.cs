using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Models.Model
{
	public class News
	{
		public int Id { get; set; }

		public string Title { get; set; }

		public string Body { get; set; }

		public string BannerUrl { get; set; }

		public int Publication { get; set; }

		public int Category { get; set; }
	}
}
