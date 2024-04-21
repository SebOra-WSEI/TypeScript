import { v4 as uuidv4 } from 'uuid';
import { Api } from './api';
import { UserModel, UserRole } from '../types/user';
import { DataType } from '../types/dataType';

export class User extends Api<UserModel> {
  public id: string;

  constructor(name: string, surname: string, role: UserRole) {
    const id = uuidv4();

    const user: UserModel = {
      id,
      name,
      surname,
      role,
    };

    super({ ...user, type: DataType.User }, { idKey: 'id', nameKey: 'name' });

    this.id = id;
  }
}
