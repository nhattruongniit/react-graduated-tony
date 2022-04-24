import * as React from 'react';

// routes
import RoutesMain from 'routes/Routes';

// hooks
import { useSafeState } from 'hooks';

export default function MiniDrawer() {
  const [count, setCount] = useSafeState(1);
  return (
    <>
      Count: {count} <br />
      <button type='button' onClick={() => setCount(prevState => prevState + 1)}>count</button>
      <RoutesMain />  
    </>
  );
}
