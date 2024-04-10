import { ContentType } from './contentType';

export interface UserModel {
  id: string;
  name: string;
  surname: string;
  role: UserRole;
  type: ContentType;
}

export enum UserRole {
  Admin = 'Admin',
  Developer = 'Developer',
  Devops = 'Devops',
}
