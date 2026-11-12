import { Navigate } from 'react-router-dom';

const isAdmin = false;

function AdminRoute({ children }) {
  if (isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
