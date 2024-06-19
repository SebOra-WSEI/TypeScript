import { Task } from '../../controllers/task';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';
import { TaskBasic } from '../../types/task';

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

export const defaultTask: TaskBasic = {
  name: '',
  description: '',
  priority: Priority.High,
  state: State.Todo,
  createdDate: String(new Date().getTime()),
  startDate: undefined,
  expectedEndTime: String(new Date().getTime()),
  endDate: undefined,
  storyPoint: 1,
  storyId: '',
};
