import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type TRows from '@/interfaces/Rows';

export type TGraphQLVars = Record<string, string | number | boolean | object | undefined>;
export interface IState {
  headers: TRows;
  focusCellKey: boolean;
  focusCellValue: boolean;
  variables: TGraphQLVars;
}

const initialState: IState = {
  headers: [{ checked: true, key: 'Content-type', value: 'application/json' }],
  focusCellKey: false,
  focusCellValue: false,
  variables: {},
};

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: (create) => ({
    gqlHeaders: create.reducer((state, action: PayloadAction<TRows>) => {
      const currentState = state;
      currentState.headers = action.payload;
    }),
    gqlFocusCellKey: create.reducer((state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.focusCellKey = action.payload;
    }),
    gqlFocusCellValue: create.reducer((state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.focusCellValue = action.payload;
    }),
    setGraphQLVariables: create.reducer((state, action: PayloadAction<TGraphQLVars>) => {
      const currentState = state;
      currentState.variables = action.payload;
    }),
  }),
  selectors: {
    selectGraphQLVariables: (state) => state.variables,
    getVariableByName: (state, name: string) => state.variables[name],
  },
});

export const { gqlHeaders, gqlFocusCellKey, gqlFocusCellValue, setGraphQLVariables } = graphqlSlice.actions;
export const { selectGraphQLVariables, getVariableByName } = graphqlSlice.selectors;

export default graphqlSlice.reducer;
