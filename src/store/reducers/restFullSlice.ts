import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type THeaders from '@/interfaces/Headers';

export interface IState {
  headers: THeaders;
}

const initialState: IState = {
  headers: [
    { checked: true, key: 'Accept', value: '*/*' },
    { checked: false, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
    { checked: true, key: 'Connection', value: 'keep-alive' },
  ],
};

export const restFullSlice = createSlice({
  name: 'restFull',
  initialState,
  reducers: {
    headers: (state, action: PayloadAction<THeaders>) => {
      const currentState = state;
      currentState.headers = action.payload;
    },
  },
});

export const { headers } = restFullSlice.actions;

export default restFullSlice.reducer;
