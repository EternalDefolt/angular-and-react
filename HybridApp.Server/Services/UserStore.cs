using HybridApp.Server.Models;

namespace HybridApp.Server.Services;

public class UserStore
{
    private record StoredUser(string UserName, string Password, string DisplayName, string Role);

    private readonly Dictionary<string, StoredUser> _users = new(StringComparer.OrdinalIgnoreCase)
    {
        ["admin"] = new("admin", "admin123", "Администратор", "Admin"),
        ["student"] = new("student", "student123", "Студент", "User"),
    };

    public UserInfo? Validate(string userName, string password)
    {
        if (!_users.TryGetValue(userName.Trim(), out var user) || user.Password != password)
        {
            return null;
        }

        return new UserInfo(user.UserName, user.DisplayName, user.Role);
    }
}
