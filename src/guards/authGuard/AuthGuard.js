import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './UseAuth';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Check for token in localStorage as a fallback
  const token = localStorage.getItem('token');
  const isAuthorized = isAuthenticated || !!token;

  if (!isAuthorized) {
    // Redirect to login but save the attempted location
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
