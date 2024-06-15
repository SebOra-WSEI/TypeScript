export const SELECTED_PROJECT_ID = 'selectedProjectId';
export const CURRENT_USER_ID = 'currentUserId';
export const JWT_TOKEN = 'jwtToken';

export function getFromLocalStorage(key: string): string {
  return window.localStorage.getItem(key) ?? '';
}

export function setToLocalStorage(key: string, element: string): void {
  window.localStorage.setItem(key, element);
}
