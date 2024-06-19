import { DB } from '../../connection/connection';
import { Task } from '../../types/task';

export async function getAllTasks(
  storyId: string
): Promise<Array<Task> | undefined> {
  return await new Promise((resolve) => {
    DB.query(
      `SELECT * FROM tasks WHERE storyId = (?)`,
      [storyId],
      (err, res) => {
        resolve(res);
      }
    );
  })
    .then((res) => {
      console.log({ res });
      return res as Array<Task>;
    })
    .catch((err) => {
      console.log('Error: ', err);
      return undefined;
    });
}
