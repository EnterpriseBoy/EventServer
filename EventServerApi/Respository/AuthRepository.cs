using EventServerApi.Helpers;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace EventServerApi.Respository
{
    public class AuthRepository : IAuthRepository
    {
        public string ConfirmAccount(Guid AccountId)
        {
            throw new NotImplementedException();
        }

        public string Login(string username, string password)
        {

            var uri = new Uri($"http://eventauth/api/auth/Login?email={username}&password={password}");
            return HttpHelper.HttpCall(uri);

            //var client = new HttpClient();
            //var httpRequestMessage = new HttpRequestMessage
            //{
            //    Method = HttpMethod.Post,
            //    RequestUri = new Uri($"http://eventauth/api/auth/Login?email={username}&password={password}")
            //};

            //var response = client.SendAsync(httpRequestMessage).Result.Content;

            //var res = "";
            //using (HttpContent content = response)
            //{
            //    Task<string> result = content.ReadAsStringAsync();
            //    res = result.Result;
            //}
            //return res;
        }

        public string Register(string Email, string Password)
        {
            throw new NotImplementedException();
        }
    }
}
