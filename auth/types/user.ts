export interface User {
  name: string;
  surname: string;
  role: UserRole;
  login: string;
  password: string;
}

export enum UserRole {
  Admin = 'Admin',
  Developer = 'Developer',
  Devops = 'Devops',
}
