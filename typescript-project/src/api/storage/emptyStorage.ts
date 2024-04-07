import { Storage } from '../../controllers/storage';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';

export const EMPTY_STORAGE = new Storage(
  'fake',
  Priority.Low,
  'fake',
  'fake',
  State.Todo,
  'fake'
);
