import { Task } from '../../controllers/task';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';
import { TaskFormBody } from '../../types/task';

export const EMPTY_TASK = new Task(
  '',
  '',
  '',
  Priority.High,
  State.Todo,
  new Date(),
  0,
  ''
);

export const defaultTask: TaskFormBody = {
  name: '',
  description: '',
  priority: Priority.High,
  state: State.Todo,
  createdDate: new Date(),
  expectedEndTime: new Date(),
  endDate: undefined,
  startDate: undefined,
  storyPoint: 1,
  assignedToId: '',
};
