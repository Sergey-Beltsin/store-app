using System.ComponentModel.DataAnnotations;

namespace Store.Identity.Models.Request
{
    public class RegisterUserRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "FirstName must be at least 2 characters and no more than 50")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "LastName must be at least 2 characters and no more than 50")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "UserName must be at least 4 characters and no more than 16")]
        public string UserName { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters and no more than 16")]
        public string Password { get; set; }
    }
}