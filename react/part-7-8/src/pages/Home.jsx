import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Главная</h2>
      <p>Добро пожаловать! Это демо localStorage и роутинга.</p>
      <div className="row">
        <Link to="/users">Перейти к пользователям →</Link>
        <Link to="/posts">Читать блог →</Link>
      </div>
    </div>
  );
}

export default Home;
