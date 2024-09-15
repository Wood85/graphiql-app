export interface IRequestLS {
  client: string;
  time: number;
  method: string;
  url: string;
  headers: IHeadersVariables[];
  body: string;
  variables: IHeadersVariables[];
}

export interface IHeadersVariables {
  checked: boolean;
  userDefined: boolean | undefined;
  key: string;
  value: string;
}
