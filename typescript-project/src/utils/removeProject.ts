import { EMPTY_PROJECT } from '../hooks/project/emptyProject';

export const removeProject = (id: string) => {
  EMPTY_PROJECT.delete(id);
  window.location.reload();
};
