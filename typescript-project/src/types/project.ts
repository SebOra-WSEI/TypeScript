import { ContentType } from './contentType';

export interface ProjectModel {
  id: string;
  name: string;
  description?: string;
  type: ContentType;
}

export type ProjectFormBody = Pick<ProjectModel, 'name' | 'description'>;
