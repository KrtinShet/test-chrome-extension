import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  const { isLoggedIn, isSignedUp } = useSelector((state) => state.auth);
  let to;

  if (!isLoggedIn && !isSignedUp) to = '/signup';
  if (!isLoggedIn && isSignedUp) to = '/login';
  return isLoggedIn ? <Outlet /> : <Navigate to={to} />;
};

export default ProtectedRoutes;
