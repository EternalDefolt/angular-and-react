import { Link, useSearchParams } from 'react-router-dom';
import { users, cities } from '../data/users';

function UsersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get('city') || '';

  const visible = city ? users.filter((u) => u.city === city) : users;

  function selectCity(value) {
    if (value) {
      setSearchParams({ city: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div>
      <h2>Пользователи</h2>
      <div className="row" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => selectCity('')}
          style={{ fontWeight: city ? 'normal' : 'bold' }}
        >
          Все
        </button>
        {cities.map((c) => (
          <button
            key={c}
            onClick={() => selectCity(c)}
            style={{ fontWeight: city === c ? 'bold' : 'normal' }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="card">
        {visible.length === 0 ? (
          <p className="muted">В городе «{city}» никого нет</p>
        ) : (
          <ul className="list">
            {visible.map((user) => (
              <li key={user.id}>
                <Link className="grow" to={`/users/${user.id}`}>
                  {user.name}
                </Link>
                <span className="muted">{user.city}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UsersList;
