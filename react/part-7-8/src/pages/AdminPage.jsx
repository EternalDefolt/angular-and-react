import { users } from '../data/users';
import { posts } from '../data/posts';

function AdminPage() {
  return (
    <div>
      <h2>Админка</h2>
      <div className="card">
        <p>Пользователей: {users.length}</p>
        <p>Постов: {posts.length}</p>
      </div>
    </div>
  );
}

export default AdminPage;
