import { type TGraphQLVars } from '@/store/reducers/graphqlSlice';

export interface IRequestLS {
  client: string;
  time: number;
  method: string;
  url: string;
  sdlUrl?: string;
  headers: IHeadersVariables[];
  body: string;
  variables: IHeadersVariables[] | TGraphQLVars;
}

export interface IHeadersVariables {
  checked: boolean;
  userDefined: boolean | undefined;
  key: string;
  value: string;
}
