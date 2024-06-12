import { DB } from '../../connection/connection';
import { Story } from '../../types/story';

export async function getAllStories(
  projectId: string
): Promise<Array<Story> | undefined> {
  return await new Promise((resolve) => {
    DB.query(
      `SELECT * FROM stories WHERE project_id = (?)`,
      [projectId],
      (err, res) => {
        resolve(res);
      }
    );
  })
    .then((res) => {
      return res as Array<Story>;
    })
    .catch((err) => {
      console.log('Error: ', err);
      return undefined;
    });
}
