import Header from './components/Header';
import Intro from './components/Intro';
import StatCard from './components/StatCard';
import StudentList from './components/StudentList';
import Footer from './components/Footer';
import { students } from './data/students';

const SORT_BY = 'gpa';

const SORT_LABELS = {
  name: 'по имени',
  age: 'по возрасту',
  gpa: 'по среднему баллу',
  course: 'по курсу',
};

function App() {
  const totalStudents = students.length;
  const avgGpa = students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;
  const youngestAge = Math.min(...students.map((s) => s.age));
  const uniqueCities = new Set(students.map((s) => s.city)).size;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <Header />

      <section className="card" style={{ marginTop: 0, marginBottom: 24 }}>
        <Intro />
      </section>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <StatCard icon="👥" label="Всего студентов" value={totalStudents} color="#e0f2fe" />
        <StatCard icon="📊" label="Средний балл" value={avgGpa.toFixed(2)} color="#dcfce7" />
        <StatCard icon="🎂" label="Младший возраст" value={`${youngestAge} лет`} color="#fef3c7" />
        <StatCard icon="🏙️" label="Городов" value={uniqueCities} color="#fce7f3" />
      </div>

      <h2 style={{ marginBottom: 16 }}>
        Список студентов{' '}
        <span style={{ fontSize: 14, fontWeight: 'normal', color: '#888' }}>
          (сортировка {SORT_LABELS[SORT_BY]})
        </span>
      </h2>

      <StudentList students={students} sortBy={SORT_BY} />

      <Footer />
    </div>
  );
}

export default App;
