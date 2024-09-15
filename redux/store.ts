import { configureStore } from '@reduxjs/toolkit';
import architectureReducer from './architectureSlice';

export const store = configureStore({
  reducer: {
    architecture: architectureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
