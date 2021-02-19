using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace EventServerApi.Helpers
{
    public class HttpHelper
    {
        public static string HttpCall(Uri uri)
        {
            var client = new HttpClient();
            var httpRequestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = uri
            };

            var response = client.SendAsync(httpRequestMessage).Result.Content;

            var res = "";
            using (var content = response)
            {
                Task<string> result = content.ReadAsStringAsync();
                res = result.Result;
            }
            return res;
        }
    }
}
