function FieldError({ error }) {
  if (!error?.message) return null;
  return <p className="error">{error.message}</p>;
}

export default FieldError;
