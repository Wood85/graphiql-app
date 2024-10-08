import type TRows from '@/interfaces/Rows';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type TGraphQLVars = Record<string, string | number | boolean | object | undefined>;
export interface IState {
  headers: TRows;
  focusCellKey: boolean;
  focusCellValue: boolean;
  variables: TGraphQLVars;
  variableNotFound: boolean;
}

const initialState: IState = {
  headers: [{ checked: true, key: 'Content-type', value: 'application/json' }],
  focusCellKey: false,
  focusCellValue: false,
  variables: {},
  variableNotFound: false,
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
    setVariableNotFound: create.reducer((state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.variableNotFound = action.payload;
    }),
  }),
  selectors: {
    selectGraphQLVariables: (state) => state.variables,
    selectVariableNotFound: (state) => state.variableNotFound,
    selectGraphQLHeaders: (state) => state.headers,
  },
});

export const { gqlHeaders, gqlFocusCellKey, gqlFocusCellValue, setGraphQLVariables, setVariableNotFound } =
  graphqlSlice.actions;
export const { selectGraphQLVariables, selectVariableNotFound, selectGraphQLHeaders } = graphqlSlice.selectors;

export default graphqlSlice.reducer;
