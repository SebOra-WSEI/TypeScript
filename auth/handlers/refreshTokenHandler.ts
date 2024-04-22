import { LoggedUser, LoginBody } from '../types/login';
import { Response } from '../types/response';
import { StatusCode } from '../types/statusCode';
import { generateToken } from '../utils/token';

export const refreshTokenHandler = (
  reqBody: LoginBody,
  refreshToken: string
): Response<LoggedUser> => {
  if (!refreshToken || !reqBody?.refreshToken) {
    return {
      status: StatusCode.BadRequest,
      message: 'Refresh token is not provided',
      response: undefined,
    };
  }

  if (refreshToken !== reqBody?.refreshToken) {
    return {
      status: StatusCode.BadRequest,
      message: 'Invalid refresh token',
      response: undefined,
    };
  }

  return {
    status: StatusCode.OK,
    message: 'Token refreshed successfully',
    response: {
      token: generateToken(reqBody?.exp || 60),
      refreshToken: generateToken(60 * 60),
    },
  };
};
