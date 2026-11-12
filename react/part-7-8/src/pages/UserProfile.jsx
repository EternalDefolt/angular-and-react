import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../data/users';
import Breadcrumbs from '../components/Breadcrumbs';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = getUserById(userId);

  const crumbs = [
    { label: 'Главная', to: '/' },
    { label: 'Пользователи', to: '/users' },
    { label: user ? user.name : `#${userId}` },
  ];

  if (!user) {
    return (
      <div>
        <Breadcrumbs items={crumbs} />
        <h2>Пользователь не найден</h2>
        <p>ID: {userId}</p>
        <button onClick={() => navigate('/users')}>К списку</button>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs items={crumbs} />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>
          Город: <Link to={`/users?city=${encodeURIComponent(user.city)}`}>{user.city}</Link>
        </p>
        <div className="row">
          <button onClick={() => navigate(-1)}>← Назад</button>
          <Link to="/users">Все пользователи</Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
