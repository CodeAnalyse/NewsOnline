using NewsOnline.Models.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Core.Repository
{
	public interface ICategoryRepository
	{
		void AddCategory(Category category);

		void UpdateCategory(Category category);

		void DeleteCategory(Category category);

		List<Category> GetCategories();
	}
}
