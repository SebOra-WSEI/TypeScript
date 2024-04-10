import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../types/contentType';
import { Api } from './api';
import { ProjectModel } from '../types/project';

export class Project extends Api<ProjectModel> {
  constructor(name: string, description?: string) {
    const id = uuidv4();

    const project: ProjectModel = {
      id,
      name,
      description,
      type: ContentType.Project,
    };

    super(project, { idKey: 'id', nameKey: 'name' });
  }
}
