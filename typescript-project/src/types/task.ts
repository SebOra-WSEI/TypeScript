import { Priority } from './priority';
import { State } from './state';

export interface TaskBasic {
  name: string;
  description: string;
  priority: Priority;
  state: State;
  createdDate: string;
  startDate?: string;
  expectedEndTime: string;
  endDate?: string;
  storyPoint: number;
  assignedToId?: number;
  storyId: string;
}

export interface TaskModel extends TaskBasic {
  id: number;
}
