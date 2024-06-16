import { DB } from '../../connection/connection';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';

export async function updateTask(
  id: string,
  name: string,
  priority: Priority,
  state: State,
  expectedEndTime: string,
  storyPoint: number,
  startDate?: string,
  endDate?: string,
  assignedToId?: number,
  description?: string
): Promise<boolean> {
  return await new Promise((resolve) => {
    DB.query(
      `UPDATE tasks SET name = (?), description = (?), priority = (?), state = (?), expectedEndTime = (?), storyPoint = (?), startDate = (?), endDate = (?), assignedToId = (?) WHERE id = (?)`,
      [
        name,
        description,
        priority,
        startDate,
        expectedEndTime,
        storyPoint,
        startDate,
        endDate,
        assignedToId,
        id,
      ],
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
