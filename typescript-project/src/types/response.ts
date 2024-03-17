import { StatusCode } from './statusCode';

export interface Response<T> {
  status: StatusCode;
  message?: string;
  errorMessage?: string;
  response: T | undefined;
}
