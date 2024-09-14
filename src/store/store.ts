import { configureStore } from '@reduxjs/toolkit';
import restFullReducer from './reducers/restFullSlice';
import headersReducer from './reducers/headersSlice';
import loadingStateReducer from './reducers/loadingStateSlice';
import graphQLVariablesReducer from './reducers/graphQLVariablesSlice';

export const store = configureStore({
  reducer: {
    rest: restFullReducer,
    headersList: headersReducer,
    loadingState: loadingStateReducer,
    graphQLVariables: graphQLVariablesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
