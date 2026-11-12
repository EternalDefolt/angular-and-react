import { Link, useParams } from 'react-router-dom';
import { getPostById, posts } from '../data/posts';
import Breadcrumbs from '../components/Breadcrumbs';

function PostPage() {
  const { id } = useParams();
  const post = getPostById(id);

  if (!post) {
    return (
      <div>
        <h2>Пост не найден</h2>
        <Link to="/posts">Ко всем постам</Link>
      </div>
    );
  }

  const index = posts.findIndex((p) => p.id === post.id);
  const prev = posts[index - 1];
  const next = posts[index + 1];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Главная', to: '/' },
          { label: 'Блог', to: '/posts' },
          { label: post.title },
        ]}
      />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{post.title}</h2>
        <p className="muted">{new Date(post.date).toLocaleDateString('ru-RU')}</p>
        <p>{post.body}</p>
      </div>
      <div className="row">
        <span className="grow">
          {prev && <Link to={`/posts/${prev.id}`}>← {prev.title}</Link>}
        </span>
        {next && <Link to={`/posts/${next.id}`}>{next.title} →</Link>}
      </div>
    </div>
  );
}

export default PostPage;
