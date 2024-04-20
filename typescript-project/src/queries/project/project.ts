import { Project } from '../../controllers/project';
import { DataType } from '../../types/dataType';
import { ProjectBasic } from '../../types/project';

export const EMPTY_PROJECT = new Project('', '');

export const defaultProject: ProjectBasic = {
  name: '',
  description: '',
  type: DataType.Project,
};
