import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  headers: string;
}

const initialState: IState = { headers: 'Content-type' };

export const restFullSlice = createSlice({
  name: 'restFull',
  initialState,
  reducers: {
    headers: (state, action: PayloadAction<string>) => {
      const currentState = state;
      currentState.headers = action.payload;
    },
  },
});

export const { headers } = restFullSlice.actions;

export default restFullSlice.reducer;
