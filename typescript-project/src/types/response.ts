import { StatusCode } from './statusCode';
import { LoggedUser } from './user';

export interface Response<T> {
  status: StatusCode;
  message?: string;
  response: T | undefined;
}

export interface LoggedUserResponse {
  data: Response<LoggedUser>;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
      status: StatusCode;
    };
  };
}
