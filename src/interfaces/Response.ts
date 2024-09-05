export interface IResponse {
  body: unknown;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
