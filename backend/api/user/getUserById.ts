import { DB } from '../../connection/connection';
import { User } from '../../types/user';

export async function getUserById(id: string): Promise<User | undefined> {
  return await new Promise((resolve) => {
    DB.query(`SELECT * FROM users WHERE id = (?)`, [id], (err, res) => {
      resolve(res);
    });
  })
    .then((res) => {
      const users = res as Array<User>;
      return users?.[0];
    })
    .catch((err) => {
      console.log('Error: ', err);
      return undefined;
    });
}
