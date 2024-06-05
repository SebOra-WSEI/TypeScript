import { StatusCode } from './statusCode';

export interface ResponseField<T> {
  data: T | undefined;
  error?: string;
  message?: string;
}

export interface QueryResponse<T> {
  status: StatusCode;
  response: ResponseField<T>;
}
