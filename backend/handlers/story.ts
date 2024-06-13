import { QueryResponse } from '../types/query';
import { Story } from '../types/story';
import { getAllStories } from '../api/story/getAllStories';
import { StatusCode } from '../types/statusCode';
import { Priority } from '../types/priority';
import { getStoryByName } from '../api/story/getStoryByName';
import { createStory } from '../api/story/createStory';
import { getStoryById } from '../api/story/getStoryById';
import { removeStory } from '../api/story/removeStory';
import { updateStory } from '../api/story/updateStory';
import { State } from '../types/state';
import { ApiHandler } from '../types/query';

interface Body {
  name: string;
  description?: string;
  priority: Priority;
  userId: number;
  projectId: number;
  state: State;
}

export const story: ApiHandler<Story, Body> = {
  getAll,
  getById,
  create,
  remove,
  update,
};

async function getAll(
  projectId?: string
): Promise<QueryResponse<Array<Story>>> {
  if (!projectId) {
    return {
      status: StatusCode.InternalServer,
      response: {
        message: 'Project id is requested',
        data: undefined,
      },
    };
  }

  const stories = await getAllStories(projectId);

  if (!stories) {
    return {
      status: StatusCode.InternalServer,
      response: {
        message: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  if (!stories?.length) {
    return {
      status: StatusCode.OK,
      response: {
        message: 'There are no stories',
        data: [],
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: { data: stories },
  };
}

async function getById(id: string): Promise<QueryResponse<Story>> {
  const story = await getStoryById(id);

  if (!Boolean(story)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Story does not exits',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: { data: story },
  };
}

async function create(body: Body): Promise<QueryResponse<Story>> {
  const { name, priority, description, userId, projectId } = body;

  if (!name || !priority || !userId || !projectId) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Fields cannot be empty',
        data: undefined,
      },
    };
  }

  const story = await getStoryByName(name, String(projectId));

  if (Boolean(story)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Story already exist',
        data: undefined,
      },
    };
  }

  const isCreated = await createStory(
    name,
    priority,
    userId,
    projectId,
    description
  );

  if (!isCreated) {
    return {
      status: StatusCode.InternalServer,
      response: {
        message: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.Created,
    response: {
      message: 'Project has been created successfully',
      data: undefined,
    },
  };
}

async function remove(id: string): Promise<QueryResponse<Story>> {
  if (!id) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Project id is requested',
        data: undefined,
      },
    };
  }

  const story = await getStoryById(id);

  if (!Boolean(story)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Story does not exits',
        data: undefined,
      },
    };
  }

  const isRemoved = await removeStory(id);

  if (!isRemoved) {
    return {
      status: StatusCode.InternalServer,
      response: {
        message: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: {
      message: 'Story has been removed successfully',
      data: undefined,
    },
  };
}

async function update(id: string, body: Body): Promise<QueryResponse<Story>> {
  if (!id) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Story id is requested',
        data: undefined,
      },
    };
  }

  const story = await getStoryById(id);

  if (!Boolean(story)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Story does not exits',
        data: undefined,
      },
    };
  }

  const isUpdated = await updateStory(
    id,
    body.name,
    body.priority,
    body.state,
    body.description
  );

  if (!isUpdated) {
    return {
      status: StatusCode.InternalServer,
      response: {
        message: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: {
      message: 'Story has been updated successfully',
      data: undefined,
    },
  };
}
