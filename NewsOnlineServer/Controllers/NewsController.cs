using NewsOnline.Common;
using NewsOnline.Core.Repository;
using NewsOnline.Models.Model;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.ModelBinding;

namespace NewsOnlineServer.Controllers
{
	public class NewsController : ApiController
	{
		INewsRepository newsRepository;
		public NewsController()
		{
			newsRepository = UnityFactory.ResolveObject<INewsRepository>();
		}

		[HttpPost]
		public object PostImage()
		{
			string baseUrl = SaveFile();
			return new
			{
				url = baseUrl
			};
		}

		private static string SaveFile()
		{
			var attachment = HttpContext.Current.Request.Files[0];
			string trailingPath = string.Format(@"\Attachments\{0}\{1}\{2}\Images", DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
			string path = System.Web.HttpContext.Current.Server.MapPath(trailingPath);

			if (!Directory.Exists(path))
				Directory.CreateDirectory(path);

			string filename = string.Format("{0}_{1}", DateTime.UtcNow.ToString("HHmmss"), attachment.FileName);
			string filePath = Path.Combine(path, filename);
			attachment.SaveAs(filePath);
			var request = HttpContext.Current.Request;
			var appUrl = HttpRuntime.AppDomainAppVirtualPath;

			var baseUrl = string.Format("{0}://{1}{2}/{3}/{4}", request.Url.Scheme, request.Url.Authority, appUrl, trailingPath.Replace(@"\", "/"), filename).Replace("///", "/");
			return baseUrl;
		}

		[HttpPost, System.Web.Mvc.ValidateInput(false)]
		public IHttpActionResult SaveNews()
		{
			try
			{
				string body = HttpUtility.UrlDecode(HttpContext.Current.Request.Params.Get("Body"));
				string url = HttpContext.Current.Request.Params["BannerUrl"];
				if (string.IsNullOrEmpty(url))
				{
					url = SaveFile();
				}
				else
				{
					url = LoadImage(url);
				}
				News news = new News()
				{
					Id = int.Parse(HttpContext.Current.Request.Params["Id"]),
					Body = body,
					Title = HttpContext.Current.Request.Params["Title"],
					Publication = int.Parse(HttpContext.Current.Request.Params["publication"]),
					Category = int.Parse(HttpContext.Current.Request.Params["category"]),
					BannerUrl = url
				};

				newsRepository.AddNews(news);
			}
			catch(Exception ex)
			{
				return BadRequest();
			}
			return Ok();
		}

		public IHttpActionResult GetNews(int pageNumber, int categoryId, int countryId, int stateId, int cityId, int publicationId, int userId)
		{
			return Ok(newsRepository.GetNews(pageNumber, categoryId, countryId, stateId, cityId, publicationId, userId));
		}

		public IHttpActionResult GetNewsById(int id)
		{
			return Ok(newsRepository.GetNewsById(id));
		}

		public string LoadImage(string imageString)
		{
			string trailingPath = string.Format(@"\Attachments\{0}\{1}\{2}\Images", DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
			string path = System.Web.HttpContext.Current.Server.MapPath(trailingPath);

			if (!Directory.Exists(path))
				Directory.CreateDirectory(path);

			string base64String = imageString.Split(',')[1];
			string extension = imageString.Split(';')[0].Split('/')[1];

			string filename = string.Format("Banner_{0}.{1}", DateTime.UtcNow.ToString("HHmmss"), extension);
			string filePath = Path.Combine(path, filename);
			var request = HttpContext.Current.Request;
			var appUrl = HttpRuntime.AppDomainAppVirtualPath;


			//data:image/gif;base64,
			//this image is a single pixel (black)
			byte[] bytes = Convert.FromBase64String(base64String);

			Image image;
			using (MemoryStream ms = new MemoryStream(bytes))
			{
				image = Image.FromStream(ms);
				image.Save(filePath);
			}

			var baseUrl = string.Format("{0}://{1}{2}/{3}/{4}", request.Url.Scheme, request.Url.Authority, appUrl, trailingPath.Replace(@"\", "/"), filename).Replace("///", "/");
			return baseUrl;
		}
	}
}
