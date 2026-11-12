function Header() {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px 32px',
        borderRadius: '12px',
        marginBottom: '24px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '28px' }}>🎓 Каталог студентов</h1>
      <p style={{ margin: '8px 0 0', opacity: 0.9 }}>Учебный проект по React</p>
    </header>
  );
}

export default Header;
