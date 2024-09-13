import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type TRows from '@/interfaces/Rows';
import { TRequestMethod } from '@/interfaces/RequestMethod';

export interface IState {
  headers: TRows;
  selectedMethod: TRequestMethod;
  focusCellKey: boolean;
  focusCellValue: boolean;
  variables: TRows;
  focusCellVariable: boolean;
  focusCellCurrentValue: boolean;
}

const initialState: IState = {
  headers: [
    { checked: true, key: 'Accept', value: '*/*' },
    { checked: true, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
    { checked: true, key: 'Connection', value: 'keep-alive' },
  ],
  selectedMethod: TRequestMethod.GET,
  focusCellKey: false,
  focusCellValue: false,
  variables: [],
  focusCellVariable: false,
  focusCellCurrentValue: false,
};

export const restFullSlice = createSlice({
  name: 'restFull',
  initialState,
  reducers: {
    headers: (state, action: PayloadAction<TRows>) => {
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
    variables: (state, action: PayloadAction<TRows>) => {
      const currentState = state;
      currentState.variables = action.payload;
    },
    focusCellVariable: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.focusCellVariable = action.payload;
    },
    focusCellCurrentValue: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.focusCellCurrentValue = action.payload;
    },
  },
});

export const {
  headers,
  selectedMethod,
  focusCellKey,
  focusCellValue,
  variables,
  focusCellVariable,
  focusCellCurrentValue,
} = restFullSlice.actions;

export default restFullSlice.reducer;
