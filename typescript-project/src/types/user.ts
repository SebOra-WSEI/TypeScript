interface UserBasic {
  name: string;
  surname: string;
  role: UserRole;
}

export interface UserModel extends UserBasic {
  id: string;
}

export enum UserRole {
  Admin = 'Admin',
  Developer = 'Developer',
  Devops = 'Devops',
}
