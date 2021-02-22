using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Store.Identity.Constants;
using Store.Identity.Contexts;
using Store.Identity.Entities;
using Store.Identity.Models.App;
using Store.Identity.Models.Request;
using Store.Identity.Models.Response;
using Store.Identity.Settings;

namespace Store.Identity.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;

        public UserService(AppDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _jwt = jwt.Value;
        }

        public async Task<UserManagerResponse> RegisterAsync(RegisterUserRequest model)
        {
            if (model == null)
                return ModelNotProvided();
            var user = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };
            var userWithEmail = await _userManager.FindByEmailAsync(model.Email);
            if (userWithEmail == null)
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, Authorization.default_role.ToString());
                    return new UserManagerResponse
                    {
                        Message = "User with email " + user.Email + " success created",
                        IsSuccess = true
                    };
                }

                return new UserManagerResponse
                {
                    Message = "wrongPassword",
                    IsSuccess = false
                };
            }

            return new UserManagerResponse
            {
                Message = "User with email " + user.Email + " exists yet",
                IsSuccess = false
            };
        }

        public async Task<UserManagerResponse> GetTokenAsync(LoginUserRequest model)
        {
            if (model == null)
                return ModelNotProvided();
            UserManagerResponse userManagerResponse = new UserManagerResponse();
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                userManagerResponse.IsSuccess = false;
                userManagerResponse.Message = "wrongEmail";
                return userManagerResponse;
            }

            if (await _userManager.CheckPasswordAsync(user, model.Password))
            {
                userManagerResponse.IsSuccess = true;
                JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
                userManagerResponse.User.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                userManagerResponse.User.Email = user.Email;
                userManagerResponse.User.UserName = user.UserName;
                var roleList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
                userManagerResponse.User.Roles = roleList.ToList();

                if (user.RefreshTokens.Any(a => a.IsActive))
                {
                    var activeRefreshToken = user.RefreshTokens.FirstOrDefault(a => a.IsActive);
                    userManagerResponse.User.RefreshToken = activeRefreshToken.Token;
                    userManagerResponse.User.RefreshTokenExpiration = activeRefreshToken.Expires;
                }
                else
                {
                    var refreshToken = CreateRefreshToken();
                    userManagerResponse.User.RefreshToken = refreshToken.Token;
                    userManagerResponse.User.RefreshTokenExpiration = refreshToken.Expires;
                    user.RefreshTokens.Add(refreshToken);
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                }

                return userManagerResponse;
            }

            userManagerResponse.IsSuccess = false;
            userManagerResponse.Message = "wrongEmail";
            return userManagerResponse;
        }

        public async Task<UserManagerResponse> RefreshTokenAsync(string token)
        {
            if (token == null)
                return ModelNotProvided();
            UserManagerResponse userManagerResponse = new UserManagerResponse();
            var user = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));
            if (user == null)
            {
                userManagerResponse.IsSuccess = false;
                userManagerResponse.Message = "Token did not match any users";
                return userManagerResponse;
            }

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            if (!refreshToken.IsActive)
            {
                userManagerResponse.IsSuccess = false;
                userManagerResponse.Message = "Token not active";
                return userManagerResponse;
            }
            
            refreshToken.Revoked = DateTime.Now;

            var newRefreshToken = CreateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            _context.Update(user);
            await _context.SaveChangesAsync();

            userManagerResponse.IsSuccess = true;
            JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
            userManagerResponse.User.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            userManagerResponse.User.Email = user.Email;
            userManagerResponse.User.UserName = user.UserName;
            var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
            userManagerResponse.User.Roles = rolesList.ToList();
            userManagerResponse.User.RefreshToken = newRefreshToken.Token;
            userManagerResponse.User.RefreshTokenExpiration = newRefreshToken.Expires;
            return userManagerResponse;
        }

        private UserManagerResponse ModelNotProvided() => new UserManagerResponse
        {
            Message = "Model not provided",
            IsSuccess = false
        };

        private RefreshToken CreateRefreshToken()
        {
            var randomNumber = new byte[32];

            using (var generator = new RNGCryptoServiceProvider())
            {
                generator.GetBytes(randomNumber);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomNumber),
                    Expires = DateTime.Now.AddDays(10),
                    Created = DateTime.Now
                };
            }
        }

        private async Task<JwtSecurityToken> CreateJwtToken(AppUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = new List<Claim>();

            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim("roles", roles[i]));
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
                .Union(userClaims)
                .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials
            );
            return jwtSecurityToken;
        }
    }
}