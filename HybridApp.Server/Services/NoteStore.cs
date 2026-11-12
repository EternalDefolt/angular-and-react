using System.Collections.Concurrent;
using HybridApp.Server.Models;

namespace HybridApp.Server.Services;

public class NoteStore
{
    private readonly ConcurrentDictionary<int, Note> _notes = new();
    private int _lastId;

    public NoteStore()
    {
        Add("Первая заметка с сервера", "system", "server");
    }

    public IReadOnlyList<Note> GetAll() =>
        _notes.Values.OrderByDescending(n => n.CreatedAt).ToList();

    public Note Add(string text, string author, string client)
    {
        var id = Interlocked.Increment(ref _lastId);
        var note = new Note(id, text.Trim(), author, client, DateTime.UtcNow);
        _notes[id] = note;
        return note;
    }

    public Note? Get(int id) => _notes.TryGetValue(id, out var note) ? note : null;

    public bool Remove(int id) => _notes.TryRemove(id, out _);
}
