import { StatusCode } from './statusCode';

export interface Response<T> {
  status: StatusCode;
  message?: string;
  response: T | undefined;
}
