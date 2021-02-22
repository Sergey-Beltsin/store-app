using System.Threading.Tasks;
using Store.Identity.Models.Request;
using Store.Identity.Models.Response;

namespace Store.Identity.Services
{
    public interface IUserService
    {
        Task<UserManagerResponse> RegisterAsync(RegisterUserRequest model);
        Task<UserManagerResponse> GetTokenAsync(LoginUserRequest model);
        Task<UserManagerResponse> RefreshTokenAsync(string token);
    }
}