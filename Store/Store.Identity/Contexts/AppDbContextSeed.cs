using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Store.Identity.Models.App;
using Store.Identity.Constants;

namespace Store.Identity.Contexts
{
    public class AppDbContextSeed
    {
        public static async Task SeedEssentialsAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Administrator.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.User.ToString()));

            var defaultUser = new AppUser
            {
                UserName = Authorization.default_username,
                Email = Authorization.default_email
            };

            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                await userManager.CreateAsync(defaultUser, Authorization.default_password);
                await userManager.AddToRoleAsync(defaultUser, Authorization.default_role.ToString());
            }
        }
    }
}