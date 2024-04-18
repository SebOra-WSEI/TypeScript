import { v4 as uuidv4 } from 'uuid';
import { DataType } from '../types/dataType';
import { Api } from './api';
import { ProjectModel } from '../types/project';

export class Project extends Api<ProjectModel> {
  constructor(name: string, description?: string) {
    const id = uuidv4();

    const project: ProjectModel = {
      id,
      name,
      description,
      type: DataType.Project,
    };

    super(project, { idKey: 'id', nameKey: 'name' });
  }
}
