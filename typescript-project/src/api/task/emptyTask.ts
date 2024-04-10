import { Task } from '../../controllers/task';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';

export const EMPTY_TASK = new Task(
  '',
  '',
  '',
  Priority.High,
  State.Todo,
  new Date(),
  new Date(),
  0,
  ''
);
