using App.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace App.PageModels
{
    public class LogInPageModel : PageModelBase
    {
        public HttpAuthService HttpAuthService { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }

        public string UserNameEntry
        {
            get
            {
                return UserName;
            }
            set
            {
                UserName = value;
                TryLogInCMD.ChangeCanExecute();
                NotifyPropertyChanged(nameof(UserName));
                NotifyPropertyChanged();
            }
        }

        public string PasswordEntry
        {
            get
            {
                return Password;
            }
            set
            {
                Password = value;
                TryLogInCMD.ChangeCanExecute();
                NotifyPropertyChanged(nameof(Password));
                NotifyPropertyChanged();
            }
        }



        public Command TryLogInCMD { get; set; }

        public Command NavigateToRegistrationPageCMD { get; set; }


        public LogInPageModel()
        {
            HttpAuthService = DependencyService.Get<HttpAuthService>();
            //Setup Commands
            this.TryLogInCMD = new Command(TryLogIn);

        }



        private async void TryLogIn()
        {
            try
            {

                string result = await HttpAuthService.LogIn(new Credentials(UserNameEntry, PasswordEntry));
                if (result != null)
                {
                    App app = (App)App.Current;
                    app.NavigationService.Push(new SendCoordinatePageModel());
                }
            }
            catch (Exception e)
            {
                await ((App)App.Current).MainPage.DisplayAlert("Error", e.Message, "Ok");
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            finally
            {
                IsBusy = false;
            }
        }


    }
}