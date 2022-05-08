import React from 'react'
import { Navigate } from 'react-router-dom';

// configs
import { PATH_NAME } from 'configs';

// service
import authService from "services/autService";

function GuestGuard({ children }) {
  const isAuth = authService.isAuthenticated();

  if(isAuth) return <Navigate to={PATH_NAME.ROOT} />

  return (
    <>{children}</>
  )
}

export default GuestGuard