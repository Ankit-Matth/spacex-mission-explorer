import { combineReducers, configureStore } from '@reduxjs/toolkit';
import launchesReducer from './launchesSlice';

const rootReducer = combineReducers({
  launches: launchesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppPreloadedState = Partial<RootState>;

export const setupStore = (preloadedState?: AppPreloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { rootReducer };