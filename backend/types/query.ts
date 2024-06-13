import { StatusCode } from './statusCode';

export interface ResponseField<T> {
  data: T | undefined;
  error?: string;
  message?: string;
  token?: string;
  refreshToken?: string;
}

export interface QueryResponse<T> {
  status: StatusCode;
  response: ResponseField<T>;
}

export interface ApiHandler<T, B> {
  getAll: (id?: string) => Promise<QueryResponse<Array<T>>>;
  getById: (id: string) => Promise<QueryResponse<T>>;
  create: (body: B) => Promise<QueryResponse<T>>;
  remove: (id: string) => Promise<QueryResponse<T>>;
  update: (id: string, body: B) => Promise<QueryResponse<T>>;
}
