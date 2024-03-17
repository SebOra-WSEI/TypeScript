import { ProjectModel } from '../types/project';
import { LOCAL_STORAGE_KEY } from './consts';

export function getAllProjectsFromLocalStorage(): Array<ProjectModel> {
  const localStorageProjects =
    window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';

  return localStorageProjects ? JSON.parse(localStorageProjects) : [];
}
