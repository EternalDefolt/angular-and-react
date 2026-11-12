using System.Security.Claims;
using HybridApp.Server.Models;
using HybridApp.Server.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HybridApp.Server.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(UserStore users) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<UserInfo>> Login(LoginRequest request)
    {
        var user = users.Validate(request.UserName ?? "", request.Password ?? "");
        if (user is null)
        {
            return Unauthorized(new { message = "Неверный логин или пароль" });
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new("display_name", user.DisplayName),
            new(ClaimTypes.Role, user.Role),
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

        return user;
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return NoContent();
    }

    [Authorize]
    [HttpGet("me")]
    public ActionResult<UserInfo> Me()
    {
        return new UserInfo(
            User.Identity!.Name!,
            User.FindFirstValue("display_name") ?? User.Identity!.Name!,
            User.FindFirstValue(ClaimTypes.Role) ?? "User");
    }
}
