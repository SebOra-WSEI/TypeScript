import { DataType } from './dataType';

export interface ProjectModel {
  id: string;
  name: string;
  description?: string;
  type: DataType;
}

export type ProjectFormBody = Pick<ProjectModel, 'name' | 'description'>;
