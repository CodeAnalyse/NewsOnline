using NewsOnline.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsOnline.Core.Repository
{
	public interface IUserRepository
	{
		void RegisterUser(User user);

		User ValidateUser(User user);

		List<User> GetUsers();

		void ApproveUser(User user);

		void DisableUser(User user);

		string IssueToken(int userId);

		User UserContext(string token);
	}
}
