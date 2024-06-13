import { DB } from '../../connection/connection';

export async function removeStory(id: string): Promise<boolean> {
  return await new Promise((resolve) => {
    DB.query(`DELETE FROM stories WHERE id = (?)`, [id], (err, res) => {
      resolve(res);
    });
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