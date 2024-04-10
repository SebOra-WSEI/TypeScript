import { Story } from '../../controllers/story';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';

export const EMPTY_STORY = new Story(
  'fake',
  Priority.Low,
  'fake',
  'fake',
  State.Todo,
  'fake'
);
