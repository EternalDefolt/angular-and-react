import { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

function RegisterPage() {
  const [registered, setRegistered] = useState(null);

  return (
    <div style={{ maxWidth: 450 }}>
      <h2>Регистрация</h2>

      {registered ? (
        <div className="success">
          <p>✅ Спасибо, {registered.name}!</p>
          <button onClick={() => setRegistered(null)}>Зарегистрировать ещё</button>
        </div>
      ) : (
        <RegistrationForm onSuccess={setRegistered} />
      )}
    </div>
  );
}

export default RegisterPage;
