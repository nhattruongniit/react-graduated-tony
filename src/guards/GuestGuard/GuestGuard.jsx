import React from 'react'
import { Navigate } from 'react-router-dom';

// configs
import { PATH_NAME } from 'configs';

function GuestGuard({ children }) {
  const isAuth = false;

  if(isAuth) return <Navigate to={PATH_NAME.ROOT} />

  return (
    <>{children}</>
  )
}

export default GuestGuard