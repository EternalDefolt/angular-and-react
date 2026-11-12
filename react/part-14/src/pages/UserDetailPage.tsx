import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/tasks';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUser(id!),
    enabled: !!id,
    retry: false,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError || !data) {
    return (
      <div className="card">
        <p>Пользователь не найден</p>
        <Link to="/users">← К списку</Link>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <div className="card" style={{ marginTop: 12 }}>
        <h1 style={{ marginTop: 0 }}>{data.name}</h1>
        <p className="muted">@{data.username}</p>
        <p>Email: {data.email}</p>
        <p>Телефон: {data.phone}</p>
        <p>Сайт: {data.website}</p>
        <p>
          Адрес: {data.address.city}, {data.address.street}
        </p>
        <p>Компания: {data.company.name}</p>
      </div>
    </div>
  );
}
