export function getFromLocalStorage(key: string): string {
  return window.localStorage.getItem(key) ?? '';
}

export function setToLocalStorage(key: string, element: string): void {
  window.localStorage.setItem(key, element);
}

export const SELECTED_PROJECT = 'selectedProject';
