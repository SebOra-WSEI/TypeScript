import { allUsers } from '../app';
import { LoggedUser, LoginBody } from '../types/login';
import { Response } from '../types/response';
import { StatusCode } from '../types/statusCode';
import { generateToken } from '../utils/token';

export const signInHandler = (reqBody: LoginBody): Response<LoggedUser> => {
  const { login, password, exp } = reqBody;

  if (!login || !password) {
    return {
      status: StatusCode.BadRequest,
      message: 'Fields cannot be empty',
      response: undefined,
    };
  }

  const user = allUsers.find((u) => u.name === login);

  if (!user || user.password !== password) {
    return {
      status: StatusCode.BadRequest,
      message: 'Invalid login or password',
      response: undefined,
    };
  }

  return {
    status: StatusCode.OK,
    message: 'User logged successfully',
    response: {
      token: generateToken(exp || 60),
      refreshToken: generateToken(60 * 60),
      user,
    },
  };
};
