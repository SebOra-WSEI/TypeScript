import { DB } from '../connection/connection';
import { Project } from '../types/project';

export async function getProjectByName(
  name: string
): Promise<Array<Project> | undefined> {
  return await new Promise((resolve) => {
    DB.query(`SELECT * FROM projects WHERE name = (?)`, [name], (err, res) => {
      resolve(res);
    });
  })
    .then((res) => {
      return res as Array<Project>;
    })
    .catch((err) => {
      console.log('Error: ', err);
      return undefined;
    });
}
