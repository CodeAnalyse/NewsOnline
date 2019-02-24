using NewsOnline.Models.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Core.Repository
{
	public interface IPublisherRepository
	{
		void AddPublisher(Publication publisher);

		void UpdatePublisher(Publication publisher);

		void DeletePublisher(Publication publisher);

		List<Publication> GetPublishers();

		List<Publication> GetPublishers(int countryId, int stateId, int cityId);
	}
}
