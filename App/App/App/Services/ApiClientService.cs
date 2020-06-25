using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;


namespace App.Services
{
    public class ApiClientService
    {


        public ApiClientService()
        { }


        public async Task<HttpResponseMessage> GetAsync(string domainName, string route, string authToken = null)
        {
            return await Task.Run(async () =>
            {
                    //Prepare client
                    var client = new HttpClient { BaseAddress = new Uri(domainName) };

                    //If token is present set header
                    if (authToken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                }

                HttpResponseMessage response = await client.GetAsync(route);
                return response;
            });
        }

        public async Task<HttpResponseMessage> GetAsync(string domainName, string route, string id, string authToken = null)
        {
            return await Task.Run(async () =>
            {
                var client = new HttpClient { BaseAddress = new Uri(domainName) };

                    //If token is present set header
                    if (authToken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                }

                HttpResponseMessage response = await client.GetAsync(route + "/" + id);
                return response;
            });
        }

        public async Task<HttpResponseMessage> GetAsync(string domainName, string route, int id, string authToken = null)
        {
            return await GetAsync(domainName, route, id.ToString(), authToken);
        }

        public async Task<HttpResponseMessage> PostAsync(string domainName, string route, object obj, string authToken = null)
        {
            return await Task.Run(async () =>
            {

                var client = new HttpClient { BaseAddress = new Uri(domainName) };

                    //If token is present set header
                    if (authToken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                }

                HttpResponseMessage response = await client.PostAsJsonAsync(route, obj);
                return response;
            });
        }

        public async Task<HttpResponseMessage> PutAsync(string domainName, string route, string id, object obj, string authToken = null)
        {
            return await Task.Run(async () =>
            {
                var client = new HttpClient { BaseAddress = new Uri(domainName) };

                    //If token is present set header
                    if (authToken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                }

                HttpResponseMessage response = await client.PutAsJsonAsync(route + "/" + id, obj);
                return response;
            });
        }

        public async Task<HttpResponseMessage> PutAsync(string domainName, string route, int id, object obj, string authToken = null)
        {
            return await PutAsync(domainName, route, id.ToString(), obj, authToken);
        }

        public async Task<HttpResponseMessage> DeleteAsync(string domainName, string route, string id, string authToken = null)
        {
            return await Task.Run(async () =>
            {
                    //Prepare client
                    var client = new HttpClient { BaseAddress = new Uri(domainName) };

                    //If token is present set header
                    if (authToken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                }

                HttpResponseMessage response = await client.DeleteAsync(route + "/" + id);
                return response;
            });
        }

        public async Task<HttpResponseMessage> DeleteAsync(string domainName, string route, int id, string authToken = null)
        {
            return await DeleteAsync(domainName, route, id.ToString(), authToken);
        }
    }
}


