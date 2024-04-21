import { Project } from '../../controllers/project';
import { ProjectBasic } from '../../types/project';

export const EMPTY_PROJECT = new Project('', '');

export const defaultProject: ProjectBasic = {
  name: '',
  description: '',
};
