import { createSlice } from '@reduxjs/toolkit';

export interface ILoadingState {
  isLoading: boolean;
}

const initialState: ILoadingState = {
  isLoading: false,
};

export const loadingStateSlice = createSlice({
  name: 'loadingState',
  initialState,
  reducers: (create) => ({
    loadingStarted: create.reducer((state) => {
      const currentState = state;
      currentState.isLoading = true;
    }),
    loadingFinished: create.reducer((state) => {
      const currentState = state;
      currentState.isLoading = false;
    }),
  }),
  selectors: {
    selectLoadingState: (state) => state.isLoading,
  },
});

export const { loadingStarted, loadingFinished } = loadingStateSlice.actions;
export const { selectLoadingState } = loadingStateSlice.selectors;

export default loadingStateSlice.reducer;
