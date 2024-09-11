import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import generalHeaders from '@/utils/headers/generalHeaders';
import requestHeaders from '@/utils/headers/requestHeaders';
import entityHeaders from '@/utils/headers/entityHeaders';

const headersForRequests = [...generalHeaders, ...requestHeaders, ...entityHeaders];

interface IState {
  reqHeaders: string[];
}

const initialState: IState = { reqHeaders: headersForRequests };

export const headersSlice = createSlice({
  name: 'headersList',
  initialState,
  reducers: {
    request: (state, action: PayloadAction<string[]>) => {
      const currentState = state;
      currentState.reqHeaders = action.payload;
    },
  },
});

export const { request } = headersSlice.actions;

export default headersSlice.reducer;
