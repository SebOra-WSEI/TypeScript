import { DB } from '../connection/connection';
import { User } from '../types/user';

export const getAllUsersCall = async (): Promise<Array<User> | undefined> => {
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
