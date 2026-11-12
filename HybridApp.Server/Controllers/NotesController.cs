using HybridApp.Server.Models;
using HybridApp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HybridApp.Server.Controllers;

[ApiController]
[Authorize]
[Route("api/notes")]
public class NotesController(NoteStore notes) : ControllerBase
{
    private static readonly HashSet<string> Clients = ["react", "angular"];

    [HttpGet]
    public IReadOnlyList<Note> GetAll() => notes.GetAll();

    [HttpPost]
    public ActionResult<Note> Create(CreateNoteRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Text))
        {
            return BadRequest(new { message = "Текст заметки пустой" });
        }

        if (request.Text.Trim().Length > 500)
        {
            return BadRequest(new { message = "Максимум 500 символов" });
        }

        var client = Clients.Contains(request.Client) ? request.Client : "unknown";
        var note = notes.Add(request.Text, User.Identity!.Name!, client);
        return CreatedAtAction(nameof(GetAll), new { id = note.Id }, note);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var note = notes.Get(id);
        if (note is null)
        {
            return NotFound();
        }

        if (note.Author != User.Identity!.Name && !User.IsInRole("Admin"))
        {
            return Forbid();
        }

        notes.Remove(id);
        return NoContent();
    }
}
