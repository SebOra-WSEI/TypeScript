import { QueryResponse } from '../types/queryResponse';
import { Story } from '../types/story';
import { getAllStories } from '../api/story/getAllStories';
import { StatusCode } from '../types/statusCode';
import { Priority } from '../types/priority';
import { getStoryByName } from '../api/story/getStoryByName';
import { createStory } from '../api/story/createStory';
import { getStoryById } from '../api/story/getStoryById';

interface Body {
  name: string;
  description?: string;
  priority: Priority;
  userId: number;
  projectId: number;
}

interface StoryCalls {
  getAll: (id: string) => Promise<QueryResponse<Array<Story>>>;
  getById: (id: string, projectId: string) => Promise<QueryResponse<Story>>;
  create: (body: Body) => Promise<QueryResponse<Story>>;
}

export const story: StoryCalls = {
  getAll,
  getById,
  create,
};

async function getAll(projectId: string): Promise<QueryResponse<Array<Story>>> {
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

async function getById(
  id: string,
  projectId: string
): Promise<QueryResponse<Story>> {
  if (!projectId) {
    return {
      status: StatusCode.InternalServer,
      response: {
        message: 'Project id is requested',
        data: undefined,
      },
    };
  }

  const story = await getStoryById(id, projectId);
  console.log(story);

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
