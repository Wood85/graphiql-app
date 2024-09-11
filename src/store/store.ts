import { configureStore } from '@reduxjs/toolkit';
import restFullReducer from '@/store/reducers/restFullSlice';
import headersReducer from '@/store/reducers/headersSlice';
import loadingStateReducer from '@/store/reducers/loadingStateSlice';

export const store = configureStore({
  reducer: {
    rest: restFullReducer,
    headersList: headersReducer,
    loadingState: loadingStateReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
