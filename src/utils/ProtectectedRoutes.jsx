import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
