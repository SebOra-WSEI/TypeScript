import { v4 as uuidv4 } from 'uuid';
import { DataType } from '../types/dataType';
import { Api } from './api';
import { UserModel, UserRole } from '../types/user';

export class User extends Api<UserModel> {
  constructor(name: string, surname: string, role: UserRole) {
    const id = uuidv4();

    const user: UserModel = {
      id,
      name,
      surname,
      role,
      type: DataType.User,
    };

    super(user, { idKey: 'id', nameKey: 'name' });
  }
}
