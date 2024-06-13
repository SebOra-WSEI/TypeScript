import { DB } from '../../connection/connection';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';

export async function updateStory(
  id: string,
  name: string,
  priority: Priority,
  state: State,
  description?: string
): Promise<boolean> {
  return await new Promise((resolve) => {
    DB.query(
      `UPDATE stories SET name = (?), description = (?), priority = (?), state = (?) WHERE id = (?)`,
      [name, description, priority, state, id],
      (err, res) => {
        resolve(res);
      }
    );
  })
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((err) => {
      console.log('Error: ', err);
      return false;
    });
}
