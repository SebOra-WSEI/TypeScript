export function getFromLocalStorage<T>(key: string): Array<T> {
  const localStorageProjects = window.localStorage.getItem(key) ?? '';

  return localStorageProjects ? JSON.parse(localStorageProjects) : [];
}
