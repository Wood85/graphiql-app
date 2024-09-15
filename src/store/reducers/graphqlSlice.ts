import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type TRows from '@/interfaces/Rows';

export interface IState {
  headers: TRows;
  focusCellKey: boolean;
  focusCellValue: boolean;
}

const initialState: IState = {
  headers: [{ checked: true, key: 'Content-type', value: 'application/json' }],
  focusCellKey: false,
  focusCellValue: false,
};

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    gqlHeaders: (state, action: PayloadAction<TRows>) => {
      const currentState = state;
      currentState.headers = action.payload;
    },
    gqlFocusCellKey: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.focusCellKey = action.payload;
    },
    gqlFocusCellValue: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.focusCellValue = action.payload;
    },
  },
});

export const { gqlHeaders, gqlFocusCellKey, gqlFocusCellValue } = graphqlSlice.actions;

export default graphqlSlice.reducer;
