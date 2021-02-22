namespace Store.Identity.Models.Response
{
    public class UserManagerResponse
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public UserResponse User { get; set; }
    }
}