import { Link, useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { usePost, useUpdatePost } from '../hooks/usePosts';
import { postToFormValues } from '../schemas/postSchema';

function EditPostPage() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePost(postId);
  const updateMutation = useUpdatePost(postId);

  async function handleSubmit(values) {
    await updateMutation.mutateAsync(values);
    navigate('/posts');
  }

  if (isLoading) return <p>Загрузка...</p>;

  if (isError || !data) {
    return (
      <div className="card">
        <p className="error">{error?.message || 'Пост не найден'}</p>
        <Link to="/posts">← К списку</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Редактирование поста #{postId}</h2>
      <PostForm
        initialData={postToFormValues(data)}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}

export default EditPostPage;
