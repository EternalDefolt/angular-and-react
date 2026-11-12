import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

function PostsList() {
  return (
    <div>
      <h2>Блог</h2>
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h3 style={{ marginTop: 0 }}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h3>
          <p className="muted">{new Date(post.date).toLocaleDateString('ru-RU')}</p>
          <p>{post.body.slice(0, 90)}...</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
