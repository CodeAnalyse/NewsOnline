using NewsOnline.Common;
using NewsOnline.Core.Repository;
using NewsOnline.Models.Model;
using System.Web.Http;

namespace NewsOnlineServer.Controllers
{
	public class CategoryController : ApiController
    {
		ICategoryRepository categoryRepository;
		public CategoryController()
		{
			categoryRepository = UnityFactory.ResolveObject<ICategoryRepository>();
		}

		public IHttpActionResult AddUpdateCategory(Category category)
		{
			try
			{
				if (category.Id == 0)
				{
					categoryRepository.AddCategory(category);
				}
				else
				{
					categoryRepository.UpdateCategory(category);
				}

				return Ok();
			}
			catch
			{
				return BadRequest();
			}
		}

		[HttpGet]
		public IHttpActionResult GetCategory()
		{
			return Ok(categoryRepository.GetCategories());
		}
	}
}
