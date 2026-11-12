import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { useCreatePost } from '../hooks/usePosts';

function NewPostPage() {
  const navigate = useNavigate();
  const createMutation = useCreatePost();

  async function handleSubmit(data) {
    await createMutation.mutateAsync(data);
    navigate('/posts');
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Новый пост</h2>
      <PostForm onSubmit={handleSubmit} submitLabel="Создать" onCancel={() => navigate('/posts')} />
    </div>
  );
}

export default NewPostPage;
