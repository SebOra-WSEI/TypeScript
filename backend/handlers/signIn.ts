import { QueryResponse } from '../types/query';
import { StatusCode } from '../types/statusCode';
import { UserResponse } from '../types/user';
import { generateToken } from '../utils/token';
import { createUserField } from '../utils/createUserField';
import { getUserByLogin } from '../api/user/getUserByLogin';

interface Body {
  login: string;
  password: string;
}

export const signIn = async (
  body: Body
): Promise<QueryResponse<UserResponse>> => {
  const { login, password } = body;

  if (!login || !password) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Fields cannot be empty',
        data: undefined,
      },
    };
  }

  const user = await getUserByLogin(login);

  if (!user || user.password !== password) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Invalid login or password',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: {
      message: 'User signed in successfully',
      token: generateToken(60 * 60),
      refreshToken: generateToken(60 * 90),
      data: createUserField(user),
    },
  };
};
