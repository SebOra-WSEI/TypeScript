import { Priority } from './priority';
import { State } from './state';
import { UserModel } from './user';

export interface StoryBasic {
  name: string;
  description?: string;
  priority: Priority;
  projectId: string;
  userId: string;
  state: State;
  owner?: UserModel;
  assignedToId?: number;
}

export interface StoryModel extends StoryBasic {
  id: number;
  createdDate: string;
}
