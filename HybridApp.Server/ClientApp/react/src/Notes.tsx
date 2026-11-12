import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { api, type Note, type User } from './api'

interface Props {
  user: User
}

function Notes({ user }: Props) {
  const [notes, setNotes] = useState<Note[]>([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      setNotes(await api.getNotes())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleAdd(e: FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    try {
      const note = await api.addNote(trimmed)
      setNotes((prev) => [note, ...prev])
      setText('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения')
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.deleteNote(id)
      setNotes((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления')
    }
  }

  const canDelete = (note: Note) => note.author === user.userName || user.role === 'Admin'

  return (
    <section className="card">
      <div className="row">
        <h2 className="grow">Общие заметки</h2>
        <button onClick={load}>Обновить</button>
      </div>

      <form className="row" onSubmit={handleAdd}>
        <input
          className="grow"
          placeholder="Новая заметка"
          value={text}
          maxLength={500}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="primary" disabled={!text.trim()}>
          Добавить
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p className="muted">Загрузка...</p>}
      {!loading && notes.length === 0 && <p className="muted">Заметок нет</p>}

      <ul className="list">
        {notes.map((note) => (
          <li key={note.id}>
            <span className={`tag tag--${note.client}`}>{note.client}</span>
            <span className="grow">
              {note.text}
              <br />
              <small className="muted">
                {note.author} · {new Date(note.createdAt).toLocaleString('ru-RU')}
              </small>
            </span>
            {canDelete(note) && <button onClick={() => handleDelete(note.id)}>✕</button>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Notes
