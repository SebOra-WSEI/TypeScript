import { QueryResponse } from '../types/queryResponse';
import { StatusCode } from '../types/statusCode';
import { generateToken } from '../utils/token';

export const refreshToken = (
  refreshTokenFromReq: string | undefined,
  refreshToken: string
): QueryResponse<undefined> => {
  if (!refreshToken || !refreshTokenFromReq) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Refresh token is not provided',
        data: undefined,
      },
    };
  }

  if (refreshToken !== refreshTokenFromReq) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Invalid refresh token',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: {
      message: 'Token refreshed successfully',
      token: generateToken(60 * 60),
      refreshToken: generateToken(60 * 90),
      data: undefined,
    },
  };
};
