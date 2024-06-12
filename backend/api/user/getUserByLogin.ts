import { DB } from '../../connection/connection';
import { User } from '../../types/user';

export const getUserByLogin = async (
  login: string
): Promise<User | undefined> => {
  return await new Promise((resolve) => {
    DB.query('SELECT * FROM users WHERE login = (?)', [login], (err, res) => {
      resolve(res);
    });
  })
    .then((res) => {
      const users = res as Array<User>;
      return users?.[0];
    })
    .catch((err) => {
      console.log('Error while searching user: ', err);
      return undefined;
    });
};
