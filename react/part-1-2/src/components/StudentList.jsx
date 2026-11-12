import StudentCard from './StudentCard';

const SORTERS = {
  name: (a, b) => a.name.localeCompare(b.name, 'ru'),
  age: (a, b) => a.age - b.age,
  gpa: (a, b) => b.gpa - a.gpa,
  course: (a, b) => a.course - b.course,
};

function StudentList({ students, sortBy }) {
  if (students.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
        Студентов пока нет 😔
      </p>
    );
  }

  const sorter = SORTERS[sortBy];
  const sorted = sorter ? [...students].sort(sorter) : students;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}
    >
      {sorted.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default StudentList;
