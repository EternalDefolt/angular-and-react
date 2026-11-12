namespace HybridApp.Server.Models;

public record LoginRequest(string UserName, string Password);

public record UserInfo(string UserName, string DisplayName, string Role);

public record Note(int Id, string Text, string Author, string Client, DateTime CreatedAt);

public record CreateNoteRequest(string Text, string Client);
