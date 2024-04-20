import { DataType } from './dataType';
import { Priority } from './priority';
import { State } from './state';
import { UserModel } from './user';

export interface StoryBasic {
  name: string;
  description?: string;
  priority: Priority;
  projectId: string;
  date: Date;
  ownerId: string;
  state: State;
  owner?: UserModel;
  assignedToId?: string;
  type: DataType;
}

export interface StoryModel extends StoryBasic {
  id: string;
}
