import { Project } from '../../controllers/project';
import { ProjectBasic } from '../../types/project';

/**
 * @deprecated Used only to the old implementation based on localStorage
 */
export const EMPTY_PROJECT = new Project('', '');

export const defaultProject: ProjectBasic = {
  name: '',
  description: '',
};
