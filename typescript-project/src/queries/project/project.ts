import { Project } from '../../controllers/project';
import { ProjectFormBody } from '../../types/project';

export const EMPTY_PROJECT = new Project('', '');

export const defaultProject: ProjectFormBody = {
  name: '',
  description: '',
};
