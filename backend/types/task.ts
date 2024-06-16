import { Priority } from './priority';
import { State } from './state';

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  state: State;
  createdDate: string;
  startDate?: string;
  expectedEndTime: string;
  endDate?: string;
  storyPoint: number;
  assignedToId: string;
  storyId: string;
}
