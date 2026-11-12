function Badge({ text, color = '#6b7280', textColor = 'white' }) {
  return (
    <span
      style={{
        background: color,
        color: textColor,
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}

export default Badge;
