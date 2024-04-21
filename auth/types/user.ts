export interface User {
  name: string;
  surname: string;
  role: UserRole;
}

export enum UserRole {
  Admin = 'Admin',
  Developer = 'Developer',
  Devops = 'Devops',
}
