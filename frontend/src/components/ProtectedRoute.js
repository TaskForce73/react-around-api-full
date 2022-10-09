import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn, ...props }) => {
  return isLoggedIn ? children : <Navigate {...props} to="/signin" />;
};

export default ProtectedRoute;
