using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Store.Identity.Models.Response
{
    public class UserResponse
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public List<string> Roles { get; set; }
        [JsonIgnore]
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}