import { DB } from '../../connection/connection';
import { getAllStories } from './getAllStories';

export async function removeStory(id: string): Promise<boolean> {
  const tasks = await getAllStories(id);
  // console.log({ tasks });

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
