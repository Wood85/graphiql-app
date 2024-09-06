import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type THeaders from '@/interfaces/Headers';
import { TRequestMethod } from '@/interfaces/RequestMethod';

export interface IState {
  headers: THeaders;
  selectedMethod: TRequestMethod;
  focusCellKey: boolean;
  focusCellValue: boolean;
}

const initialState: IState = {
  headers: [
    { checked: true, key: 'Accept', value: '*/*' },
    { checked: false, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
    { checked: true, key: 'Connection', value: 'keep-alive' },
  ],
  selectedMethod: TRequestMethod.GET,
  focusCellKey: false,
  focusCellValue: false,
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
    focusCellKey: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.focusCellKey = action.payload;
    },
    focusCellValue: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.focusCellValue = action.payload;
    },
  },
});

export const { headers, selectedMethod, focusCellKey, focusCellValue } = restFullSlice.actions;

export default restFullSlice.reducer;
