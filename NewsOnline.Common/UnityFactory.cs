using DatabaseMiddleware.Core;
using DatabaseMiddleware.Implementation;
using NewsOnline.Core.Repository;
using NewsOnline.Implementation.Repository;
using Unity;

namespace NewsOnline.Common
{
	public static class UnityFactory
	{
		private static IUnityContainer _container;

		/// <summary>
		/// Used to initialize unity container.
		/// </summary>
		/// <returns>Returns container.</returns>
		public static IUnityContainer Initialize()
		{
			var container = new UnityContainer();
			RegisterTypes(container);
			_container = container;
			return _container;
		}

		/// <summary>
		/// Registers different types to container.
		/// </summary>
		/// <param name="container">Instance of container to register.</param>
		public static void RegisterTypes(IUnityContainer container)
		{
			container.RegisterType<IDatabaseMiddleware, DatabaseMssqlMiddleware>();
			container.RegisterType<IUserRepository, UserRepository>();
			container.RegisterType<ICategoryRepository, CategoryRepository>();
			container.RegisterType<IPublisherRepository, PublisherRepository>();
			container.RegisterType<INewsRepository, NewsRepository>();
			container.RegisterType<ILocationRepository, LocationRepository>();
		}

		/// <summary>
		/// Resolves objects from container.
		/// </summary>
		/// <typeparam name="T">Type to resolve from container.</typeparam>
		/// <param name="name">Name of the instance used to resolve.</param>
		/// <returns>Intance of resolved type.</returns>
		public static T ResolveObject<T>(string name = null)
		{
			return _container.Resolve<T>(name);
		}
	}
}