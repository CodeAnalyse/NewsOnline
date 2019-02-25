using NewsOnline.Common;
using NewsOnline.Core.Repository;
using NewsOnline.Models;
using NewsOnline.Models.Model;
using System.Linq;
using System.Web.Http;

namespace NewsOnlineServer.Controllers
{
	public class PublisherController : ApiController
    {
		private User CurrentUser
		{
			get
			{
				string token = Request.Headers.GetValues("AppSecure").FirstOrDefault();
				return userRepository.UserContext(token);
			}
		}
		IPublisherRepository publisherRepository;
		IUserRepository userRepository;
		public PublisherController()
		{
			publisherRepository = UnityFactory.ResolveObject<IPublisherRepository>();
			userRepository = UnityFactory.ResolveObject<IUserRepository>();
		}

		public IHttpActionResult AddUpdatePublisher(Publication publisher)
		{
			try
			{
				if (publisher.Id == 0)
				{
					publisher.UserId = CurrentUser.Id;
					publisherRepository.AddPublisher(publisher);
				}
				else
				{
					publisherRepository.UpdatePublisher(publisher);
				}

				return Ok();
			}
			catch
			{
				return BadRequest();
			}
		}

		[HttpGet]
		public IHttpActionResult GetPublisher()
		{
			return Ok(publisherRepository.GetPublishers());
		}

		[HttpGet]
		public IHttpActionResult GetPublisherByLocation(int countryId, int stateId, int cityId)
		{
			return Ok(publisherRepository.GetPublishers(countryId, stateId, cityId));
		}
	}
}
