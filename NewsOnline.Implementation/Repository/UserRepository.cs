using DatabaseMiddleware.Core;
using NewsOnline.Core.Repository;
using NewsOnline.Models;
using NewsOnline.Models.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace NewsOnline.Implementation.Repository
{
	public class UserRepository : IUserRepository
	{
		IDatabaseMiddleware _db;
		public UserRepository(IDatabaseMiddleware db)
		{
			_db = db;
			_db.SetDatabase(ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
		}

		public User UserContext(string token)
		{
			string sql = @"Select U.[Id]
						,[username]
						--,[password]
						,[email]
						,[type]
						,[StatusId]
						,UT.Token
						from UserToken UT
					INNER JOIN [User] U ON UT.UserId = U.Id Where UT.Token = @token";
			DataSet ds = _db.GetDataSetFromSql(sql, new SqlParameter("@token", token));
			User user = new User();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				foreach (DataRow row in ds.Tables[0].Rows)
				{
					user = new User()
					{
						Username = row.Field<string>("username"),
						Email = row.Field<string>("email"),
						Type = row.Field<string>("type"),
						StatusId = row.Field<int>("StatusId"),
						Id = row.Field<int>("Id"),
						Token = row.Field<string>("Token")
					};
				}
			}

			return user;
		}

		public void RegisterUser(User user)
		{
			_db.ExecuteProcedure("usp_RegisterUser",
				new SqlParameter("@username", user.Username),
				new SqlParameter("@email", user.Email),
				new SqlParameter("@password", user.Password),
				new SqlParameter("@type", user.Type));
		}

		public User ValidateUser(User user)
		{
			string sql = "Select Id, email, [password], type, StatusId from [User] where username = @userName";
			DataSet ds = _db.GetDataSetFromSql(sql, new SqlParameter("@username", user.Username));
			User user1 = new User();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				user1.Password = ds.Tables[0].Rows[0].Field<string>("password");
				user1.Type = ds.Tables[0].Rows[0].Field<string>("type");
				user1.Username = user.Username;
				user1.Email = ds.Tables[0].Rows[0].Field<string>("email");
				user1.StatusId = ds.Tables[0].Rows[0].Field<int>("StatusId");
				user1.Id = ds.Tables[0].Rows[0].Field<int>("Id");
			}

			return user1;
		}

		public string IssueToken(int userId)
		{
			string token = Guid.NewGuid().ToString();
			_db.ExecuteProcedure("usp_UserToken_Insert",
				new SqlParameter("@userId", userId),
				new SqlParameter("@token", token));
			return token;
		}

		public List<User> GetUsers()
		{
			string sql = "Select Id, username, email, [password], type, StatusId from [User] Where [type] != 'Admin'";
			DataSet ds = _db.GetDataSetFromSql(sql);
			List<User> users = new List<User>();
			if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
			{
				foreach(DataRow row in ds.Tables[0].Rows)
				{
					users.Add(new User()
					{
						Username = row.Field<string>("username"),
						Email = row.Field<string>("email"),
						Type = row.Field<string>("type"),
						StatusId = row.Field<int>("StatusId"),
						Id = row.Field<int>("Id")
					});
				}
			}

			return users;
		}

		public void ApproveUser(User user)
		{
			string query = "update [User] SET StatusId = 1 Where Id ="+ user.Id;
			_db.ExecuteSql(query);
		}

		public void DisableUser(User user)
		{
			string query = "update [User] SET StatusId = 0 Where Id =" + user.Id;
			_db.ExecuteSql(query);
		}
	}
}
