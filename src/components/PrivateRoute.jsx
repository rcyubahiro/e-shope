import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContexts';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
}
