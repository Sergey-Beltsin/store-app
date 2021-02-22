using System.ComponentModel.DataAnnotations;

namespace Store.Identity.Models.Request
{
    public class LoginUserRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters and no more than 16")]
        public string Password { get; set; }
    }
}