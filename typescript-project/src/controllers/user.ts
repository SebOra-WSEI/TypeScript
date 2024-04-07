import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../types/contentType';
import { Api } from './api';

interface UserModel {
  id: string;
  name: string;
  surname: string;
}
export class User extends Api<UserModel> {
  constructor(name: string, surname: string) {
    const id = uuidv4();
    const project = {
      id,
      name,
      surname,
    };

    super(project, ContentType.User, {
      idKey: 'id',
      nameKey: 'name',
    });
  }
}
