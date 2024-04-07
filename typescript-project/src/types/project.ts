export interface ProjectModel {
  id: string;
  name: string;
  description?: string;
}

export type ProjectFormBody = Pick<ProjectModel, 'name' | 'description'>;
