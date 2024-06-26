import { DB } from '../../connection/connection';
import { Story } from '../../types/story';

export async function getStoryByName(
  name: string,
  projectId: string
): Promise<Story | undefined> {
  return await new Promise((resolve) => {
    DB.query(
      `SELECT * FROM stories WHERE name = (?) AND projectId = (?)`,
      [name, projectId],
      (err, res) => {
        resolve(res);
      }
    );
  })
    .then((res) => {
      const stories = res as Array<Story>;
      return stories?.[0];
    })
    .catch((err) => {
      console.log('Error: ', err);
      return undefined;
    });
}
