import Badge from './Badge';
import SkillsList from './SkillsList';

function renderStars(rating) {
  const fullStars = Math.round(rating);
  const emptyStars = 5 - fullStars;
  return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
}

function StudentCard({ student }) {
  const { name, age, course, city, gpa, skills } = student;

  const courseColor = course >= 3 ? '#28a745' : '#ffc107';
  const isExcellent = gpa >= 4.5;
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=96&rounded=true`;

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <img
          src={avatarUrl}
          alt={name}
          width={48}
          height={48}
          style={{ borderRadius: '50%', flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>{name}</h3>
          {isExcellent && (
            <div style={{ marginTop: 4 }}>
              <Badge text="🏆 Отличник" color="#fef3c7" textColor="#92400e" />
            </div>
          )}
        </div>
        <Badge text={`${course} курс`} color={courseColor} />
      </div>

      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Возраст:</strong> {age} лет
      </p>
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Город:</strong> {city}
      </p>
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Средний балл:</strong> {gpa} {renderStars(gpa)}
      </p>

      <SkillsList skills={skills} />
    </div>
  );
}

export default StudentCard;
