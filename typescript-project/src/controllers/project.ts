import { v4 as uuidv4 } from 'uuid';
import { ClassType } from '../types/class';

export class Project {
  id: string;
  name: string;
  description?: string;
  type: string;

  constructor(name: string, description?: string) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.type = ClassType.Project;
  }
}
