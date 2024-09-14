import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TGraphQLVars = Record<string, string | number | boolean | object | undefined>;
interface IGraphQLVars {
  variables: TGraphQLVars;
}

const initialState: IGraphQLVars = {
  variables: {},
};

export const graphQLVariablesSlice = createSlice({
  name: 'graphQLVariables',
  initialState,
  reducers: (create) => ({
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

export const { setGraphQLVariables } = graphQLVariablesSlice.actions;
export const { selectGraphQLVariables, getVariableByName } = graphQLVariablesSlice.selectors;

export default graphQLVariablesSlice.reducer;
