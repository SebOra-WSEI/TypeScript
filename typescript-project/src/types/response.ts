import { StatusCode } from './statusCode';

export interface Response<T> {
  status: StatusCode;
  message?: string;
  error?: string;
  response: T | undefined;
}
