import { Story } from '../../controllers/story';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';
import { CURRENT_USER_ID, getFromLocalStorage } from '../../utils/localStorage';

export const EMPTY_STORY = new Story(
  'fake',
  Priority.Low,
  'fake',
  'fake',
  State.Todo,
  'fake'
);

export const defaultStory = {
  name: '',
  description: '',
  priority: Priority.High,
  ownerId: getFromLocalStorage(CURRENT_USER_ID),
};
