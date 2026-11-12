function SkillsList({ skills, title = 'Навыки:' }) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: 12 }}>
      <strong style={{ fontSize: '14px' }}>{title}</strong>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 6 }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              background: '#eef2ff',
              color: '#4338ca',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsList;
