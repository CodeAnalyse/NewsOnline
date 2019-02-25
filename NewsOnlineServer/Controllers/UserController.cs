using NewsOnline.Common;
using NewsOnline.Core.Repository;
using NewsOnline.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Web.Helpers;
using System.Web.Http;

namespace NewsOnlineServer.Controllers
{
	public class UserController : ApiController
	{
		private User CurrentUser
		{
			get
			{
				string token = Request.Headers.GetValues("AppSecure").FirstOrDefault();
				return userRepository.UserContext(token);
			}
		}

		IUserRepository userRepository;
		public UserController()
		{
			userRepository = UnityFactory.ResolveObject<IUserRepository>();
		}

		[HttpPost]
		public IHttpActionResult RegisterUser(User user)
		{
			try
			{
				var userGet = userRepository.ValidateUser(user);
				if(userGet != null)
				{
					return BadRequest("Username already Exists!!");
				}

				string p = user.Password;
				user.Password = Crypto.HashPassword(user.Password);
				userRepository.RegisterUser(user);
			}
			catch(Exception ex)
			{
				return BadRequest("Error while saving user!!");
			}
			return Ok();
		}


		[HttpPost]
		public IHttpActionResult Login(User user)
		{
			try
			{
				var userGet = userRepository.ValidateUser(user);
				if(userGet == null || userGet.Id == 0)
				{
					return BadRequest("Username is not correct!!");
				}
				string password = userGet.Password;
				if (!string.IsNullOrEmpty(password) && Crypto.VerifyHashedPassword(password, user.Password))
				{
					userGet.Password = "";
					userGet.Token = userRepository.IssueToken(userGet.Id);
					return Ok(userGet);
				}
				else
				{
					return BadRequest("Password is not correct!!");
				}
			}
			catch(Exception ex)
			{
				return BadRequest("User Validation Failed!!");
			}
		}

		[HttpPost]
		public IHttpActionResult ApproveUser(User user)
		{
			try
			{
				userRepository.ApproveUser(user);
				return Ok();
			}
			catch
			{
				return BadRequest();
			}
		}

		[HttpPost]
		public IHttpActionResult DisableUser(User user)
		{
			try
			{
				userRepository.DisableUser(user);
				return Ok();
			}
			catch
			{
				return BadRequest();
			}
		}

		[HttpGet]
		public IHttpActionResult GetUsers()
		{
			if(CurrentUser != null && !CurrentUser.Type.Equals("Admin"))
			{
				return Ok();
			}
			return Ok(userRepository.GetUsers());
		}
	}
}
