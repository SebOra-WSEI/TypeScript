import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../types/contentType';
import { Api } from './api';
import { UserModel, UserRole } from '../types/user';

export class User extends Api<UserModel> {
  constructor(name: string, surname: string, role: UserRole) {
    const id = uuidv4();
    const user = {
      id,
      name,
      surname,
      role,
    };

    super(user, ContentType.User, {
      idKey: 'id',
      nameKey: 'name',
    });
  }
}
