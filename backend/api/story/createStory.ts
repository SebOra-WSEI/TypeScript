import { DB } from '../../connection/connection';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';

export async function createStory(
  name: string,
  priority: Priority,
  userId: number,
  projectId: number,
  description?: string
): Promise<boolean> {
  return await new Promise((resolve) => {
    DB.query(
      `INSERT INTO stories(name, description, priority, state, createdDate, user_id, project_id) VALUES((?), (?), (?), (?), (?), (?), (?))`,
      [
        name,
        description,
        priority,
        State.Todo,
        new Date().getTime(),
        userId,
        projectId,
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
