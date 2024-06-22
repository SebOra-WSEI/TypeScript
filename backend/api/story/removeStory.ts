import { DB } from '../../connection/connection';
import { getAllTasks } from '../task/getAllTasks';
import { removeTask } from '../task/removeTask';

export async function removeStory(id: string): Promise<boolean> {
  const tasks = await getAllTasks(id);
  tasks?.forEach(async ({ id }) => {
    await removeTask(String(id));
  });

  return await new Promise((resolve) => {
    DB.query(`DELETE FROM stories WHERE id = (?)`, [id], (err, res) => {
      resolve(res);
    });
  })
    .then((res) => {
      if (res === undefined) {
        console.log('Undefined response');
        return false;
      }

      return true;
    })
    .catch((err) => {
      console.log('Error: ', err);
      return false;
    });
}
