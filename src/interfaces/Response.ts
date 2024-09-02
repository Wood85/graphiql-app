export interface IResponse {
  ok: boolean;
  data: unknown;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
