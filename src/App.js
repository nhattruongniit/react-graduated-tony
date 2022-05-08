import * as React from 'react';
import { useSelector } from 'react-redux';

// mui core
import LinearProgress from '@mui/material/LinearProgress';

// routes
import RoutesMain from 'routes/Routes';



export default function MiniDrawer() {
  const showLoading = useSelector(state => state.app.showLoading)

  console.log('showLoading: ', showLoading)

  return (
    <>
      <RoutesMain />  

      {showLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999,
            width: '100%'
          }}
        >
          <LinearProgress />
        </div>
      )}
    </>
  );
}
