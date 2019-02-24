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
	public class NewsRepository : INewsRepository
	{
		IDatabaseMiddleware _db;
		public NewsRepository(IDatabaseMiddleware db)
		{
			_db = db;
			_db.SetDatabase(ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
		}

		public void AddNews(News news)
		{
			_db.ExecuteProcedure("usp_News_InsUpd",
				new SqlParameter("@title", news.Title),
				new SqlParameter("@body", news.Body),
				new SqlParameter("@publication", news.Publication),
				new SqlParameter("@category", news.Category),
				new SqlParameter("@bannerUrl", news.BannerUrl));
		}

		public void DeleteNews(News category)
		{
			throw new NotImplementedException();
		}

		public News GetNewsById(int Id)
		{
			string sql = @"SELECT N.[Id]
				  ,[Title]
				  ,[PublishDate]
				  ,[BannerUrl]
				  ,[Body]
				  ,Publication = P.name
				  ,Category = C.name
			  FROM [News] N
			  INNER JOIN Category C ON C.Id = N.Category
			  INNER JOIN Publisher P ON P.Id = N.Publication
			  Where N.[Id] = @newsId
			  ORDER BY PublishDate DESC";
			DataSet ds = _db.GetDataSetFromSql(sql, new SqlParameter("@newsId", Id));
			News news = new News();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				for (int i = 0; i < 1; i++)
				{
					var row = ds.Tables[0].Rows[i];
					news = new News()
					{
						Title = row.Field<string>("Title"),
						BannerUrl = row.Field<string>("BannerUrl"),
						Body = row.Field<string>("Body"),
						Id = row.Field<int>("Id")
					};
				}
			}

			return news;
		}

		public List<News> GetNews(int pageNumber, int categoryId, int countryId, int stateId, int cityId, int publicationId)
		{
			string sql = @"SELECT N.[Id]
				  ,[Title]
				  ,[PublishDate]
				  ,[BannerUrl]
				  ,[Body]
				  ,Publication
				  ,Publication = P.name
				  ,Category = C.name
			  FROM [News] N
			  INNER JOIN Category C ON C.Id = N.Category
			  INNER JOIN Publisher P ON P.Id = N.Publication
			  Where (@category = 0 OR N.Category = @category)
				AND (@country = 0 OR P.Country = @country)
				AND (@state = 0 OR P.[State] = @state)
				AND (@city = 0 OR P.City = @city)
				AND (@publicationId = 0 OR P.Id = @publicationId)
			  ORDER BY PublishDate DESC";
			DataSet ds = _db.GetDataSetFromSql(sql, new SqlParameter("@category", categoryId),
				new SqlParameter("@country", countryId),
				new SqlParameter("@state", stateId),
				new SqlParameter("@city", cityId),
				new SqlParameter("@publicationId", publicationId));
			int start = (pageNumber - 1) * 10;
			int end = (10 * pageNumber);
			List<News> news = new List<News>();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				for (int i = start; i < Math.Min(ds.Tables[0].Rows.Count, end); i++)
				{
					var row = ds.Tables[0].Rows[i];
					news.Add(new News()
					{
						Title = row.Field<string>("Title"),
						BannerUrl = row.Field<string>("BannerUrl"),
						Body = row.Field<string>("Body"),
						Id = row.Field<int>("Id")
					});
				}
			}

			return news;
		}

		public void UpdateNews(News category)
		{
			throw new NotImplementedException();
		}
	}
}
