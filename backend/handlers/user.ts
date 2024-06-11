import { QueryResponse } from '../types/queryResponse';
import { StatusCode } from '../types/statusCode';
import { NoPasswordUser } from '../types/user';
import { getAllUsersCall } from '../api/getAllUsers';

export const getAllUsers = async (): Promise<
  QueryResponse<Array<NoPasswordUser>>
> => {
  const users = await getAllUsersCall();

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
};
