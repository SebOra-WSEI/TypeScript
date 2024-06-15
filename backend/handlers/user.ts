import { getAllUsers } from '../api/user/getAllUsers';
import { getUserById } from '../api/user/getUserById';
import { QueryResponse } from '../types/query';
import { StatusCode } from '../types/statusCode';
import { NoPasswordUser } from '../types/user';

interface UserCalls {
  getAll: () => Promise<QueryResponse<Array<NoPasswordUser>>>;
  getById: (id: string) => Promise<QueryResponse<NoPasswordUser>>;
}

export const user: UserCalls = {
  getAll,
  getById,
};

async function getAll(): Promise<QueryResponse<Array<NoPasswordUser>>> {
  const users = await getAllUsers();

  if (!users) {
    return {
      status: StatusCode.InternalServer,
      response: {
        error: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  if (!users?.length) {
    return {
      status: StatusCode.OK,
      response: {
        message: 'There are no users',
        data: [],
      },
    };
  }

  const data: Array<NoPasswordUser> | undefined = users?.map(
    ({ id, name, surname, role, login }) => ({
      id,
      name,
      surname,
      role,
      login,
    })
  );

  return {
    status: StatusCode.OK,
    response: { data },
  };
}

async function getById(id: string): Promise<QueryResponse<NoPasswordUser>> {
  const user = await getUserById(id);

  if (!user) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'User does not exits',
        data: undefined,
      },
    };
  }

  const noPasswordUser: NoPasswordUser = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    role: user.role,
    login: user.login,
  };

  return {
    status: StatusCode.OK,
    response: { data: noPasswordUser },
  };
}
