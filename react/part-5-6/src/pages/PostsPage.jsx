import { useEffect, useState } from 'react';
import { getPostsPage } from '../api';

const LIMIT = 10;

function PostsPage() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    getPostsPage(page, LIMIT, controller.signal)
      .then((data) => {
        setPosts(data.posts);
        setTotal(data.total);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <div>
      <h2>Посты с пагинацией</h2>
      <div className="row" style={{ marginBottom: 12 }}>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1 || loading}>
          ← Назад
        </button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages || loading}
        >
          Вперёд →
        </button>
      </div>

      <div className="card">
        {loading && <p>Загрузка...</p>}
        {!loading && error && <p className="error">Ошибка: {error}</p>}
        {!loading && !error && posts.length === 0 && <p>Постов нет</p>}
        {!loading && !error && posts.length > 0 && (
          <ul className="list">
            {posts.map((post) => (
              <li key={post.id} style={{ alignItems: 'flex-start' }}>
                <span className="muted" style={{ minWidth: 32 }}>
                  #{post.id}
                </span>
                <span className="grow">
                  <b>{post.title}</b>
                  <br />
                  <span className="muted">{post.body}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostsPage;
