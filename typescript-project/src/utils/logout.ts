import {
  CURRENT_USER_ID,
  JWT_TOKEN,
  SELECTED_PROJECT_ID,
} from './localStorage';

export const handleLogout = (): void => {
  window.localStorage.removeItem(SELECTED_PROJECT_ID);
  window.localStorage.removeItem(CURRENT_USER_ID);
  window.localStorage.removeItem(JWT_TOKEN);
};
