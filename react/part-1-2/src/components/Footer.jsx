function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 40,
        padding: '16px 0',
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
      }}
    >
      © {year} Каталог студентов. Все права защищены.
    </footer>
  );
}

export default Footer;
