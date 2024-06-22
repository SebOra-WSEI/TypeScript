import { DB } from '../../connection/connection';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';

export async function updateStory(
  id: string,
  name: string,
  priority: Priority,
  state: State,
  assignedToId: string | undefined,
  description?: string
): Promise<boolean> {
  return await new Promise((resolve) => {
    DB.query(
      `UPDATE stories SET name = (?), description = (?), priority = (?), state = (?), assignedToId = (?) WHERE id = (?)`,
      [
        name,
        description,
        priority,
        state,
        assignedToId ? Number(assignedToId) : undefined,
        id,
      ],
      (err, res) => {
        resolve(res);
      }
    );
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
