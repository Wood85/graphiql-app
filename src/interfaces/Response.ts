export interface IResponse {
  body: unknown | ITextBody | IImageBody;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ITextBody {
  text: string;
}

export interface IImageBody {
  url: string;
  width: number;
  height: number;
}
