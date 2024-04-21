export interface ProjectBasic {
  name: string;
  description?: string;
}

export interface ProjectModel extends ProjectBasic {
  id: string;
}
