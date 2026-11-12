const userName = 'Алексей';
const userAge = 28;
const isStudent = true;
const skills = ['JavaScript', 'HTML', 'CSS'];

function Intro() {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - userAge;

  return (
    <>
      <h2>Привет, {userName}!</h2>

      <p>
        Тебе {userAge} лет. Ты родился в {birthYear} году.
      </p>

      <p>Статус: {isStudent ? 'Студент' : 'Работает'}</p>

      <p style={{ color: 'blue', fontWeight: 'bold' }}>Это синий жирный текст</p>

      <div className="card">
        <h3>Навыки:</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Intro;
