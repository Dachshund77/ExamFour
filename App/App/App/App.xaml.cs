using App.PageModels;
using App.Services;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace App
{
    public partial class App : Application
    {
        public NavigationService NavigationService { get; set; }

     

        public App()
        {
            //DependencyService.Register<NavigationService>(); <- Refactor to this
            DependencyService.Register<ApiClientService>();
            DependencyService.Register<HttpAuthService>();

            InitializeComponent();
            this.NavigationService = new NavigationService(SetMainPage, GetMainPage);

            this.NavigationService.ChangeNavigationPageRoot(new LogInPageModel());
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }

        public void SetMainPage(Page newPage)
        {
            this.MainPage = newPage;
        }

        public Page GetMainPage()
        {
            return MainPage;
        }

    }
}
