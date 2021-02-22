namespace Store.Identity.Constants
{
    public class Authorization
    {
        public enum Roles
        {
            Administrator,
            User
        }

        public const string default_username = "user";
        public const string default_email = "user@mail.ru";
        public const string default_password = "mY_seCReT_pAs$w0rD";
        public const Roles default_role = Roles.User;
    }
}