using NewsOnline.Models.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Core.Repository
{
	public interface ILocationRepository
	{
		List<Country> GetCountries();

		List<State> GetStates(int countryId);

		List<City> GetCities(int stateId);
	}
}
