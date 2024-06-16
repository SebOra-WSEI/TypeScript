import { DB } from '../../connection/connection';
import { Task } from '../../types/task';

export async function getTaskById(id: string): Promise<Task | undefined> {
  return await new Promise((resolve) => {
    DB.query(`SELECT * FROM tasks WHERE id = (?)`, [id], (err, res) => {
      resolve(res);
    });
  })
    .then((res) => {
      const stories = res as Array<Task>;
      return stories?.[0];
    })
    .catch((err) => {
      console.log('Error: ', err);
      return undefined;
    });
}
