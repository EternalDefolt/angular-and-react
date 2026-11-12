import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, getPosts } from '../api/posts';

function AddPostForm() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setTitle('');
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    mutation.mutate({ title, body: 'Новый пост', userId: 1 });
  }

  return (
    <form onSubmit={handleSubmit} className="row" style={{ marginBottom: 20 }}>
      <input
        className="grow"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок поста"
      />
      <button type="submit" className="primary" disabled={mutation.isPending}>
        {mutation.isPending ? 'Создание...' : 'Создать'}
      </button>
      {mutation.isSuccess && <span className="muted">Создан #{mutation.data.id}</span>}
      {mutation.isError && <p className="error">Ошибка: {mutation.error.message}</p>}
    </form>
  );
}

function PostsList() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) return <p>Загрузка постов...</p>;
  if (isError) {
    return (
      <div>
        <p className="error">Ошибка: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  return (
    <div>
      <p className="muted" style={{ minHeight: 20 }}>{isFetching ? 'Обновление...' : ''}</p>
      <ul className="list card">
        {data.map((post) => (
          <li key={post.id} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <strong>{post.title}</strong>
            <span className="muted" style={{ fontSize: 13 }}>
              {post.body}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QueryPractice() {
  return (
    <div style={{ maxWidth: 700 }}>
      <h2>Посты (практика части 12)</h2>
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default QueryPractice;
