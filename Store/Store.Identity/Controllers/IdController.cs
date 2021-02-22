using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.Identity.Models.Request;
using Store.Identity.Models.Response;
using Store.Identity.Services;

namespace Store.Identity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdController : ControllerBase
    {
        private readonly IUserService _userService;

        public IdController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterUserRequest model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.RegisterAsync(model);
                if (result.IsSuccess)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }

            return BadRequest(new UserManagerResponse
            {
                Message = "error",
                IsSuccess = false
            });
        }

        [HttpPost("token")]
        public async Task<IActionResult> GetTokenAsync(LoginUserRequest model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.GetTokenAsync(model);
                if (result.IsSuccess)
                {
                    SetRefreshTokenInCookie(result.User.RefreshToken);
                    return Ok(result);
                }

                return BadRequest(result);
            }

            return BadRequest(new UserManagerResponse
            {
                Message = "error",
                IsSuccess = false
            });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var result = await _userService.RefreshTokenAsync(refreshToken);
            if (!string.IsNullOrEmpty(result.User.RefreshToken))
                SetRefreshTokenInCookie(result.User.RefreshToken);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        private void SetRefreshTokenInCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddDays(10)
            };
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}