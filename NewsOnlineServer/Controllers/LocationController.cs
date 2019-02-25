using NewsOnline.Common;
using NewsOnline.Core.Repository;
using NewsOnline.Models.Model;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;
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

		public object GetLocation(string ip)
		{
			string URI = string.Format("http://api.ipstack.com/{0}?access_key=f5c71b9939fc8f41e5ea99cd1671235a&format=1", ip);

			using (WebClient wc = new WebClient())
			{
				wc.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
				string HtmlResult = wc.DownloadString(URI);

				return JsonConvert.DeserializeObject(HtmlResult);
			}
		}
	}
}
