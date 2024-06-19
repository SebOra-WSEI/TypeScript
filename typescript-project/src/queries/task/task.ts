import { Priority } from '../../types/priority';
import { State } from '../../types/state';
import { TaskBasic } from '../../types/task';

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
