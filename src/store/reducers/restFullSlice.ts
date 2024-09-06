import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type THeaders from '@/interfaces/Headers';
import { TRequestMethod } from '@/interfaces/RequestMethod';

export interface IState {
  headers: THeaders;
  selectedMethod: TRequestMethod;
}

const initialState: IState = {
  headers: [
    { checked: true, key: 'Accept', value: '*/*' },
    { checked: false, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
    { checked: true, key: 'Connection', value: 'keep-alive' },
  ],
  selectedMethod: TRequestMethod.GET,
};

export const restFullSlice = createSlice({
  name: 'restFull',
  initialState,
  reducers: {
    headers: (state, action: PayloadAction<THeaders>) => {
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
