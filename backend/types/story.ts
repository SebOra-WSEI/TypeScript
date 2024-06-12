import { Priority } from '../types/priority';
import { State } from '../types/state';

export interface Story {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  state: State;
  createdDate: Date;
  userId: number;
  projectId: number;
}
