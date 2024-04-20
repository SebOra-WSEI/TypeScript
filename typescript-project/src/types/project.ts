import { DataType } from './dataType';

export interface ProjectBasic {
  name: string;
  description?: string;
  type: DataType;
}

export interface ProjectModel extends ProjectBasic {
  id: string;
}
