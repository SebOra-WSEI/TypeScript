import { v4 as uuidv4 } from 'uuid';
import { ClassType } from '../types/class';
import { Api } from './api';
import { ProjectModel } from '../types/project';

export class Project extends Api<ProjectModel> {
  public id: string;
  public name: string;
  public description?: string;

  constructor(name: string, description?: string) {
    const id = uuidv4();
    const project = {
      id,
      name,
      description,
      type: ClassType.Project,
    };

    super(project, 'id', 'name');

    this.id = id;
    this.name = name;
    this.description = description;
  }
}
