using DatabaseMiddleware.Core;
using NewsOnline.Core.Repository;
using NewsOnline.Models.Model;
using System.Collections.Generic;
using System.Configuration;
using System.Data;

namespace NewsOnline.Implementation.Repository
{
	public class LocationRepository : ILocationRepository
	{
		IDatabaseMiddleware _db;
		public LocationRepository(IDatabaseMiddleware db)
		{
			_db = db;
			_db.SetDatabase(ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);

		}
		public List<City> GetCities(int stateId)
		{
			string sql = "Select Id, Name, StateId from Cities Where StateId = " + stateId;
			DataSet ds = _db.GetDataSetFromSql(sql);
			List<City> cities = new List<City>();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				foreach (DataRow row in ds.Tables[0].Rows)
				{
					cities.Add(new City()
					{
						Name = row.Field<string>("Name"),
						Id = row.Field<int>("Id"),
						StateId = row.Field<int>("StateId")
					});
				}
			}

			return cities;
		}

		public List<Country> GetCountries()
		{
			string sql = "Select Id, Name from Countries";
			DataSet ds = _db.GetDataSetFromSql(sql);
			List<Country> countries = new List<Country>();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				foreach (DataRow row in ds.Tables[0].Rows)
				{
					countries.Add(new Country()
					{
						Name = row.Field<string>("Name"),
						Id = row.Field<int>("Id")
					});
				}
			}

			return countries;
		}

		public List<State> GetStates(int countryId)
		{
			string sql = "Select Id, Name, CountryId from States Where CountryId = " + countryId;
			DataSet ds = _db.GetDataSetFromSql(sql);
			List<State> states = new List<State>();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				foreach (DataRow row in ds.Tables[0].Rows)
				{
					states.Add(new State()
					{
						Name = row.Field<string>("Name"),
						Id = row.Field<int>("Id"),
						CountryId = row.Field<int>("CountryId")
					});
				}
			}

			return states;
		}
	}
}
