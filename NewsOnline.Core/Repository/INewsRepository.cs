using NewsOnline.Models.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Core.Repository
{
	public interface INewsRepository
	{
		void AddNews(News category);

		void UpdateNews(News category);

		void DeleteNews(News category);

		List<News> GetNews(int pageNumber, int categoryId, int countryId, int stateId, int cityId, int publicationId);

		News GetNewsById(int Id);
	}
}
