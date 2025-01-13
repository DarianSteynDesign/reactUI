import { Outlet, Navigate } from 'react-router-dom';

const isAuthenticated = !!localStorage.getItem('authToken'); 

export const PrivateRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};