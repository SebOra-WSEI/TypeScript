import { DB } from '../../connection/connection';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';

export async function createTask(
  name: string,
  priority: Priority,
  expectedEndTime: string,
  storyPoint: number,
  storyId: number,
  startDate?: string,
  endDate?: string,
  assignedToId?: number,
  description?: string
): Promise<boolean> {
  return await new Promise((resolve) => {
    DB.query(
      `INSERT INTO tasks(name, priority, state, createdDate, expectedEndTime, startDate, endDate, storyPoint, storyId, assignedToId, description) VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?))`,
      [
        name,
        priority,
        State.Todo,
        new Date().getTime(),
        expectedEndTime,
        startDate,
        endDate,
        storyPoint,
        storyId,
        assignedToId,
        description,
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
