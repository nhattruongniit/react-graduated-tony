import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const user = useSelector(state => state.app.user);
  return (
    <div>
      Dashboard
      abc
      <br />
      Email: {user?.email}
    </div>
  )
}

export default Dashboard