using DatabaseMiddleware.Core;
using NewsOnline.Core.Repository;
using NewsOnline.Models.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Implementation.Repository
{
	public class CategoryRepository : ICategoryRepository
	{
		IDatabaseMiddleware _db;
		public CategoryRepository(IDatabaseMiddleware db)
		{
			_db = db;
			_db.SetDatabase(ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
		}

		public void AddCategory(Category category)
		{
			_db.ExecuteProcedure("usp_Category_InsUpd",
				new SqlParameter("@name", category.Name),
				new SqlParameter("@statusId", category.StatusId));
		}

		public void DeleteCategory(Category category)
		{
			throw new NotImplementedException();
		}

		public List<Category> GetCategories()
		{
			string sql = "Select Id, name, StatusId from Category";
			DataSet ds = _db.GetDataSetFromSql(sql);
			List<Category> categories = new List<Category>();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				foreach (DataRow row in ds.Tables[0].Rows)
				{
					categories.Add(new Category()
					{
						Name = row.Field<string>("name"),
						StatusId = row.Field<int>("StatusId"),
						Id = row.Field<int>("Id")
					});
				}
			}

			return categories;
		}

		public void UpdateCategory(Category category)
		{
			_db.ExecuteProcedure("usp_Category_InsUpd",
				new SqlParameter("@Id", category.Id),
				new SqlParameter("@name", category.Name),
				new SqlParameter("@statusId", category.StatusId));
		}
	}
}
