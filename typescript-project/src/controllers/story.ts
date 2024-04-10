import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { ContentType } from '../types/contentType';
import { StatusCode } from '../types/statusCode';
import { StoryModel } from '../types/story';
import { EMPTY_USER } from '../api/user/emptyUser';
import { Response } from '../types/response';

export class Story extends Api<StoryModel> {
  constructor(
    name: string,
    priority: Priority,
    projectId: string,
    ownerId: string,
    state: State,
    description?: string
  ) {
    const id = uuidv4();
    const date = new Date();

    const story: StoryModel = {
      id,
      name,
      description,
      priority,
      projectId,
      date,
      ownerId,
      state,
      type: ContentType.Story,
    };

    super(story, {
      idKey: 'id',
      nameKey: 'name',
      projectIdKey: 'projectId',
    });
  }

  getAllByProjectId(id: string): Response<Array<StoryModel>> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const stories = this.getAll().response as Array<StoryModel>;
    const filteredStories = stories.filter((s) => s.projectId === id);
    const extendedStories = filteredStories.map((story) => ({
      ...story,
      owner: EMPTY_USER.getById(story.ownerId).response,
    }));

    return {
      status: StatusCode.OK,
      response: extendedStories,
    };
  }
}
