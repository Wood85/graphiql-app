import { configureStore } from '@reduxjs/toolkit';
import restFullReducer from '@/store/reducers/restFullSlice';
import loadingStateReducer from '@/store/reducers/loadingStateSlice';

export const store = configureStore({
  reducer: {
    rest: restFullReducer,
    loadingState: loadingStateReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
