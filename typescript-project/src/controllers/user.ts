import { v4 as uuidv4 } from 'uuid';
import { ClassType } from '../types/element';

export class User {
  id: string;
  name: string;
  surname: string;
  type: string;

  constructor(name: string, surname: string) {
    this.id = uuidv4();
    this.name = name;
    this.surname = surname;
    this.type = ClassType.User;
  }
}
