import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  headers: string;
  selectedMethod: TRequestMethod;
}

const initialState: IState = {
  headers: 'Content-type',
  selectedMethod: TRequestMethod.GET,
};

export const restFullSlice = createSlice({
  name: 'restFull',
  initialState,
  reducers: {
    headers: (state, action: PayloadAction<string>) => {
      const currentState = state;
      currentState.headers = action.payload;
    },
    selectedMethod: (state, action: PayloadAction<TRequestMethod>) => {
      const currentState = state;
      currentState.selectedMethod = action.payload;
    },
  },
});

export const { headers, selectedMethod } = restFullSlice.actions;

export default restFullSlice.reducer;
