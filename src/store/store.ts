import { configureStore } from '@reduxjs/toolkit';
import restFullReducer from '@/store/reducers/restFullSlice';
import headersReducer from '@/store/reducers/headersSlice';

export const store = configureStore({
  reducer: {
    rest: restFullReducer,
    headersList: headersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
