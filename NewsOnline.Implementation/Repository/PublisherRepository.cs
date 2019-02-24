using DatabaseMiddleware.Core;
using NewsOnline.Core.Repository;
using NewsOnline.Models;
using NewsOnline.Models.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace NewsOnline.Implementation.Repository
{
	public class PublisherRepository : IPublisherRepository
	{
		private User CurrentUser
		{
			get
			{
				string token = HttpContext.Current.Request.Headers.GetValues("Authorization").FirstOrDefault();
				return _userRepository.UserContext(token);
			}
		}

		IDatabaseMiddleware _db;
		IUserRepository _userRepository;
		public PublisherRepository(IDatabaseMiddleware db, IUserRepository userRepository)
		{
			_db = db;
			_db.SetDatabase(ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
			_userRepository = userRepository;
		}

		public void AddPublisher(Publication publisher)
		{
			_db.ExecuteProcedure("usp_Publish_InsUpd",
				new SqlParameter("@name", publisher.Name),
				new SqlParameter("@country", publisher.SelectedCountry),
				new SqlParameter("@state", publisher.SelectedState),
				new SqlParameter("@city", publisher.SelectedCity),
				new SqlParameter("@category", publisher.SelectedCategory),
				new SqlParameter("@statusId", publisher.StatusId),
				new SqlParameter("@userId", publisher.UserId));
		}

		public void DeletePublisher(Publication publisher)
		{
			throw new NotImplementedException();
		}

		public List<Publication> GetPublishers()
		{
			string sql = "Select Id, name, StatusId, Country, [State], City, Category from Publisher Where UserId = @userId";
			DataSet ds = _db.GetDataSetFromSql(sql, new SqlParameter("@userId", CurrentUser.Id));
			List<Publication> publishers = new List<Publication>();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				foreach (DataRow row in ds.Tables[0].Rows)
				{
					publishers.Add(new Publication()
					{
						Name = row.Field<string>("name"),
						StatusId = row.Field<int>("StatusId"),
						Id = row.Field<int>("Id"),
						SelectedCountry = row.Field<int>("Country"),
						SelectedState = row.Field<int>("State"),
						SelectedCity = row.Field<int>("City"),
						//SelectedCategory = row.Field<int>("Category")
					});
				}
			}

			return publishers;
		}

		public List<Publication> GetPublishers(int countryId, int stateId, int cityId)
		{
			string sql = @"Select Id, name, StatusId, Country, [State], City, Category from Publisher P Where
				(@country = 0 OR P.Country = @country)
				AND(@state = 0 OR P.[State] = @state)
				AND(@city = 0 OR P.City = @city)";
			DataSet ds = _db.GetDataSetFromSql(sql, new SqlParameter("@country", countryId),
				new SqlParameter("@state", stateId),
				new SqlParameter("@city", cityId));
			List<Publication> publishers = new List<Publication>();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				foreach (DataRow row in ds.Tables[0].Rows)
				{
					publishers.Add(new Publication()
					{
						Name = row.Field<string>("name"),
						StatusId = row.Field<int>("StatusId"),
						Id = row.Field<int>("Id"),
						SelectedCountry = row.Field<int>("Country"),
						SelectedState = row.Field<int>("State"),
						SelectedCity = row.Field<int>("City"),
						//SelectedCategory = row.Field<int>("Category")
					});
				}
			}

			return publishers;
		}

		public void UpdatePublisher(Publication publisher)
		{
			_db.ExecuteProcedure("usp_Publish_InsUpd",
				new SqlParameter("@Id", publisher.Id),
				new SqlParameter("@name", publisher.Name),
				new SqlParameter("@country", publisher.SelectedCountry),
				new SqlParameter("@state", publisher.SelectedState),
				new SqlParameter("@city", publisher.SelectedCity),
				new SqlParameter("@category", publisher.SelectedCategory),
				new SqlParameter("@statusId", publisher.StatusId));
		}
	}
}
