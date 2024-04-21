import { User, UserRole } from '../types/user';

export const DEFAULT_USERS: Array<User> = [
  {
    name: 'Sebastian',
    surname: 'Oraczek',
    role: UserRole.Admin,
  },
  {
    name: 'Jan',
    surname: 'Kowalski',
    role: UserRole.Developer,
  },
  {
    name: 'Aleksandra',
    surname: 'Grzesiak',
    role: UserRole.Devops,
  },
];
