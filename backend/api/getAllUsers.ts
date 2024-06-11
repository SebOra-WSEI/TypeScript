import { DB } from '../connection/connection';
import { QueryResponse } from '../types/queryResponse';
import { StatusCode } from '../types/statusCode';
import { NoPasswordUser, User } from '../types/user';

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

const getAllUsersCall = async (): Promise<Array<User> | undefined> => {
  return await new Promise((resolve) => {
    DB.query(`SELECT * FROM users`, (err, res) => {
      resolve(res);
    });
  })
    .then((res) => {
      return res as Array<User>;
    })
    .catch((err) => {
      console.log('Error: ', err);
      return undefined;
    });
};
