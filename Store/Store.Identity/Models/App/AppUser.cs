using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Store.Identity.Entities;

namespace Store.Identity.Models.App
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}