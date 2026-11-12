function FieldError({ show, message }) {
  if (!show || !message) return null;
  return <p className="error">{message}</p>;
}

export default FieldError;
