import { configureStore } from '@reduxjs/toolkit';

import restFullReducer from './reducers/restFullSlice';
import graphqlReducer from './reducers/graphqlSlice';
import headersReducer from './reducers/headersSlice';
import loadingStateReducer from './reducers/loadingStateSlice';

export const store = configureStore({
  reducer: {
    rest: restFullReducer,
    headersList: headersReducer,
    loadingState: loadingStateReducer,
    graphql: graphqlReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
