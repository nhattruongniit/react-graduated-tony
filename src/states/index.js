import { configureStore } from '@reduxjs/toolkit';

// reducers
import appReducer from './app/app.slice';

export const store = configureStore({
  reducer: {
    app: appReducer
  }
})