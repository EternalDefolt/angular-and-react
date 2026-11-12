import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { postKeys, useDeletePost, usePosts } from '../hooks/usePosts';

function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch, isFetching, isPlaceholderData } = usePosts(page);
  const deleteMutation = useDeletePost(page);

  const visiblePosts = useMemo(() => {
    const posts = data?.posts ?? [];
    const q = search.trim().toLowerCase();
    return q ? posts.filter((p) => p.title.toLowerCase().includes(q)) : posts;
  }, [data, search]);

  function goToPage(next) {
    setSearchParams(next === 1 ? {} : { page: String(next) });
  }

  function openPost(post) {
    if (!queryClient.getQueryData(postKeys.detail(post.id))) {
      queryClient.setQueryData(postKeys.detail(post.id), post, { updatedAt: 0 });
    }
  }

  function handleDelete(id) {
    deleteMutation.mutate(id);
  }

  if (isLoading) return <p>Загрузка...</p>;

  if (isError) {
    return (
      <div className="card">
        <p className="error">Ошибка: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  const totalPages = data.totalPages;

  return (
    <div>
      <div className="row" style={{ marginBottom: 12 }}>
        <h2 className="grow" style={{ margin: 0 }}>
          Посты
        </h2>
        <button className="primary" onClick={() => navigate('/posts/new')}>
          + Создать пост
        </button>
      </div>

      <div className="row" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          className="grow"
          placeholder="Поиск по заголовку на этой странице"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
          ← Назад
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages || isPlaceholderData}
        >
          Вперёд →
        </button>
      </div>

      <p className="muted" style={{ minHeight: 20 }}>
        {isFetching ? 'Обновление...' : ''}
        {deleteMutation.isError ? ` Не удалось удалить: ${deleteMutation.error.message}` : ''}
      </p>

      {visiblePosts.length === 0 ? (
        <p className="muted">Ничего не найдено</p>
      ) : (
        visiblePosts.map((post) => (
          <div className="card row" key={post.id} style={{ alignItems: 'flex-start' }}>
            <div className="grow">
              {post.optimistic ? (
                <b>{post.title}</b>
              ) : (
                <Link to={`/posts/${post.id}`} onClick={() => openPost(post)}>
                  <b>{post.title}</b>
                </Link>
              )}
              <p className="muted" style={{ margin: '4px 0 0' }}>
                {post.optimistic ? 'Сохраняется...' : `${post.body.slice(0, 100)}${post.body.length > 100 ? '...' : ''}`}
              </p>
            </div>
            {!post.optimistic && (
              <div className="post-actions">
                <button onClick={() => navigate(`/posts/${post.id}/edit`)}>Редактировать</button>
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deleteMutation.isPending && deleteMutation.variables === post.id}
                >
                  Удалить
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default PostsPage;
