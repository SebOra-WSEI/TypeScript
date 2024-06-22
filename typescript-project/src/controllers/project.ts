import { v4 as uuidv4 } from 'uuid';
import { DataType } from '../types/dataType';
import { Api } from './api';
import { ProjectModel } from '../types/project';

/**
 * @deprecated Used only to the old implementation based on localStorage
 */
export class Project extends Api<ProjectModel> {
  constructor(name: string, description?: string) {
    const id = uuidv4();

    const project: ProjectModel = {
      id: Number(id),
      name,
      description,
    };

    super(
      { ...project, type: DataType.Project },
      { idKey: 'id', nameKey: 'name' }
    );
  }
}
