import { v4 as uuidv4 } from 'uuid';
import { ClassType } from '../types/class';
import { Api } from './api';

interface UserModel {
  id: string;
  name: string;
  surname: string;
}
export class User extends Api<UserModel> {
  public id: string;
  public name: string;
  public surname: string;

  constructor(name: string, surname: string) {
    const id = uuidv4();
    const project = {
      id,
      name,
      surname,
      type: ClassType.User,
    };

    super(project, 'id', 'name');

    this.id = id;
    this.name = name;
    this.surname = surname;
  }
}
