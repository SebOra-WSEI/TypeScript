import { DB } from '../../connection/connection';
import { Task } from '../../types/task';

export async function getTaskByName(
  name: string,
  projectId: string
): Promise<Task | undefined> {
  return await new Promise((resolve) => {
    DB.query(
      `SELECT * FROM tasks WHERE name = (?) AND storyId = (?)`,
      [name, projectId],
      (err, res) => {
        resolve(res);
      }
    );
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
