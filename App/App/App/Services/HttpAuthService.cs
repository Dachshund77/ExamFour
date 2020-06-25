using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace App.Services
{
    public class HttpAuthService
    {
        ApiClientService apiClient;

        public HttpAuthService()
        {
            apiClient = DependencyService.Get<ApiClientService>();
        }

        public async Task<string> LogIn(Credentials credentials)
        {
            string returnValue = null;

            //Init needed values
            App app = (App)App.Current;

            HttpResponseMessage response = await Task.Run<HttpResponseMessage>(() =>
            {
                return apiClient.PostAsync("http://localhost:3000", "auth/login", credentials);
            });

            //Process response code
            switch (response.StatusCode)
            {
                case HttpStatusCode.InternalServerError:
                    await app.MainPage.DisplayAlert("Error", "The Server suffered a critical error, try again later.", "Ok");
                    break;
                case HttpStatusCode.BadRequest:
                    await app.MainPage.DisplayAlert("Error", "Could not log in, with given User name and password.", "Ok");
                    break;
                case HttpStatusCode.NotFound:
                    await app.MainPage.DisplayAlert("Error", "Could not log in, with given User name and password.", "Ok");
                    break;
                case HttpStatusCode.OK:
                    returnValue = await response.Content.ReadAsAsync<string>();
                    break;
                default:
                    throw new Exception();

            }
            return returnValue;
        }

    }
}
