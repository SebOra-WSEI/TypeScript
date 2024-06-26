import { DB } from '../../connection/connection';

export async function updateProject(
  id: string,
  name: string,
  description?: string
): Promise<boolean> {
  return await new Promise((resolve) => {
    DB.query(
      `UPDATE projects SET name = (?), description = (?) WHERE id = (?)`,
      [name, description, id],
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
