import { getAllUsers } from '../api/getAllUsers';
import { QueryResponse } from '../types/queryResponse';
import { StatusCode } from '../types/statusCode';
import { NoPasswordUser } from '../types/user';

interface UserCalls {
  getAll: () => Promise<QueryResponse<Array<NoPasswordUser>>>;
}

export const user: UserCalls = {
  getAll,
};

async function getAll(): Promise<QueryResponse<Array<NoPasswordUser>>> {
  const users = await getAllUsers();

  if (!users) {
    return {
      status: StatusCode.InternalServer,
      response: {
        message: 'Internal Server Error',
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
