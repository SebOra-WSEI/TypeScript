import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { DataType } from '../types/dataType';
import { StoryModel } from '../types/story';

/**
 * @deprecated Used only to the old implementation based on localStorage
 */
export class Story extends Api<StoryModel> {
  constructor(
    name: string,
    priority: Priority,
    projectId: string,
    userId: string,
    state: State,
    description?: string
  ) {
    const id = uuidv4();
    const createdDate = String(new Date().getTime());

    const story: StoryModel = {
      id: Number(id),
      name,
      description,
      priority,
      projectId,
      createdDate,
      userId,
      state,
    };

    super(
      { ...story, type: DataType.Story },
      {
        idKey: 'id',
        nameKey: 'name',
        projectIdKey: 'projectId',
      }
    );
  }
}
