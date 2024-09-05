import { configureStore } from '@reduxjs/toolkit';
import restFullReducer from '@/store/reducers/restFullSlice';

export const store = configureStore({
  reducer: {
    rest: restFullReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
