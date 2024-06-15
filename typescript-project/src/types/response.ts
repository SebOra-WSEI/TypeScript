import { StatusCode } from './statusCode';

/**
 * @deprecated Used only to the old implementation based on localStorage
 */
export interface Response<T> {
  status: StatusCode;
  message?: string;
  response: T | undefined;
}

interface ResponseField<T> {
  data: T | undefined;
  error?: string;
  message?: string;
  token?: string;
  refreshToken?: string;
}

export interface QueryResponse<T> {
  data: ResponseField<T>;
  status: StatusCode;
}

export interface ErrorResponse<T> {
  response: {
    status: StatusCode;
    data: ResponseField<T>;
  };
}
