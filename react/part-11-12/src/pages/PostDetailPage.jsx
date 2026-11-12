import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeletePostFromDetail, usePost } from '../hooks/usePosts';

const STATUS_LABELS = { draft: 'Черновик', published: 'Опубликован' };

function PostDetailPage() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const { data: post, isLoading, isError, isFetching } = usePost(postId);
  const deleteMutation = useDeletePostFromDetail(postId);

  function handleDelete() {
    deleteMutation.mutate(undefined, {
      onSuccess: () => navigate('/posts'),
    });
  }

  if (isLoading) return <p>Загрузка...</p>;

  if (isError || !post) {
    return (
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Пост не найден</h2>
        <p className="muted">Поста с id «{id}» нет.</p>
        <Link to="/posts">← К списку постов</Link>
      </div>
    );
  }

  return (
    <div>
      <p>
        <Link to="/posts">← Все посты</Link>
      </p>
      <div className="card">
        <p className="muted" style={{ marginTop: 0 }}>
          Пост #{post.id} · автор #{post.userId}
          {post.status && (
            <span className={`status-${post.status}`}> · {STATUS_LABELS[post.status]}</span>
          )}
          {post.publishDate && <span> · {post.publishDate}</span>}
          {isFetching && <span> · обновление...</span>}
        </p>
        <h2>{post.title}</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.body}</p>
        {post.tags?.length > 0 && (
          <p>
            {post.tags.map((tag) => (
              <span className="tag-chip" key={tag}>
                #{tag}
              </span>
            ))}
          </p>
        )}
        <div className="row">
          <button onClick={() => navigate(`/posts/${post.id}/edit`)}>Редактировать</button>
          <button onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
        {deleteMutation.isError && <p className="error">Ошибка: {deleteMutation.error.message}</p>}
      </div>
    </div>
  );
}

export default PostDetailPage;
