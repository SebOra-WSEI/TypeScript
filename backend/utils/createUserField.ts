import { User, UserResponse } from '../types/user';

export const createUserField = (user: User): UserResponse => ({
  id: user.id,
  name: user.name,
  surname: user.surname,
  login: user.login,
  role: user.role,
});
