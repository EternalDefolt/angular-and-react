import { useRef, useState } from 'react';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
}

function FilePage() {
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(null);

  function handleChange() {
    setFiles(Array.from(fileRef.current.files || []));
    setUploaded(null);
  }

  function clear() {
    fileRef.current.value = '';
    setFiles([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const selected = Array.from(fileRef.current.files || []);
    if (selected.length === 0) {
      fileRef.current.click();
      return;
    }
    setUploaded(selected.map((f) => f.name));
    clear();
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Файловый инпут через useRef</h2>
      <form className="form card" onSubmit={handleSubmit}>
        <input ref={fileRef} type="file" multiple onChange={handleChange} style={{ display: 'none' }} />
        <div className="row">
          <button type="button" onClick={() => fileRef.current.click()}>
            📎 Выбрать файлы
          </button>
          {files.length > 0 && (
            <button type="button" onClick={clear}>
              Очистить
            </button>
          )}
        </div>

        {files.length === 0 ? (
          <p className="muted">Файл не выбран</p>
        ) : (
          <ul className="list">
            {files.map((f) => (
              <li key={f.name + f.size}>
                <span className="grow">{f.name}</span>
                <span className="muted">{formatSize(f.size)}</span>
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className="primary">
          Отправить
        </button>
      </form>
      {uploaded && <div className="success">✅ Отправлено: {uploaded.join(', ')}</div>}
    </div>
  );
}

export default FilePage;
