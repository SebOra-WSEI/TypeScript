import { DB } from '../../connection/connection';

export async function createProject(
  name: string,
  description?: string
): Promise<boolean> {
  return await new Promise((resolve) => {
    DB.query(
      `INSERT INTO projects(name, description) VALUES((?), (?))`,
      [name, description],
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

      console.log(res);
      return true;
    })
    .catch((err) => {
      console.log('Error: ', err);
      return false;
    });
}
