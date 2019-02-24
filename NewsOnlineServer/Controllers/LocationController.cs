using NewsOnline.Common;
using NewsOnline.Core.Repository;
using NewsOnline.Models.Model;
using System.Collections.Generic;
using System.Web.Http;

namespace NewsOnlineServer.Controllers
{
	public class LocationController : ApiController
	{
		ILocationRepository locationRepository;
		public LocationController()
		{
			locationRepository = UnityFactory.ResolveObject<ILocationRepository>();
		}

		public List<Country> GetCountries()
		{
			return locationRepository.GetCountries();
		}

		public List<State> GetStates(int countryId)
		{
			return locationRepository.GetStates(countryId);
		}

		public List<City> GetCities(int stateId)
		{
			return locationRepository.GetCities(stateId);
		}
	}
}
