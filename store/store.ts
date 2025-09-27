import { configureStore } from '@reduxjs/toolkit';
import launchesReducer from './launchesSlice';

export const store = configureStore({
  reducer: {
    launches: launchesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;