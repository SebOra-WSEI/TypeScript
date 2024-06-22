import { DB } from '../../connection/connection';
import { getAllStories } from '../story/getAllStories';
import { removeStory } from '../story/removeStory';
import { getAllTasks } from '../task/getAllTasks';
import { removeTask } from '../task/removeTask';

export async function removeProject(id: string): Promise<boolean> {
  const stories = await getAllStories(id);

  await stories?.forEach(async ({ id }) => {
    const tasks = await getAllTasks(String(id));
    tasks?.forEach(async ({ id }) => await removeTask(String(id)));

    await removeStory(String(id));
  });

  return await new Promise((resolve) => {
    DB.query(`DELETE FROM projects WHERE id = (?)`, [id], (err, res) => {
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
