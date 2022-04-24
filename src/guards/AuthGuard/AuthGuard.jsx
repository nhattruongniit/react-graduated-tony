import React from 'react'
import { Navigate } from 'react-router-dom';

// configs
import { PATH_NAME } from 'configs';

function AuthGuard({ children }) {
  const isAuth = false;

  if(!isAuth) return <Navigate to={PATH_NAME.LOGIN} />

  return (
    <>{children}</>
  )
}

export default AuthGuard