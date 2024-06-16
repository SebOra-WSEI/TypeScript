import { ApiHandler, QueryResponse } from '../types/query';
import { StatusCode } from '../types/statusCode';
import { Task } from '../types/task';
import { getAllTasks } from '../api/task/getAllTasks';
import { getTaskById } from '../api/task/getTaskById';
import { getTaskByName } from '../api/task/getTaskByName';
import { createTask } from '../api/task/createTask';
import { removeTask } from '../api/task/removeTask';
import { updateTask } from '../api/task/updateTask';
import { Priority } from '../types/priority';
import { State } from '../types/state';

interface Body {
  name: string;
  description: string;
  priority: Priority;
  state: State;
  storyPoint: number;
  assignedToId?: number;
  expectedEndTime: string;
  storyId: number;
  endDate?: string;
  startDate?: string;
}

export const task: ApiHandler<Task, Body> = {
  getAll,
  getById,
  create,
  remove,
  update,
};

export async function getAll(
  taskId?: string
): Promise<QueryResponse<Array<Task>>> {
  if (!taskId) {
    return {
      status: StatusCode.InternalServer,
      response: {
        error: 'Story id is requested',
        data: undefined,
      },
    };
  }

  const tasks = await getAllTasks(taskId);

  if (!tasks) {
    return {
      status: StatusCode.InternalServer,
      response: {
        error: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  if (!tasks?.length) {
    return {
      status: StatusCode.OK,
      response: {
        message: 'There are no tasks',
        data: [],
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: { data: tasks },
  };
}

export async function getById(id: string): Promise<QueryResponse<Task>> {
  const story = await getTaskById(id);

  if (!Boolean(story)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Task does not exits',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: { data: story },
  };
}

export async function create(body: Body): Promise<QueryResponse<Task>> {
  const {
    name,
    priority,
    description,
    expectedEndTime,
    storyId,
    startDate,
    endDate,
    storyPoint,
    assignedToId,
  } = body;

  if (!name || !priority || !expectedEndTime) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Fields cannot be empty',
        data: undefined,
      },
    };
  }

  const story = await getTaskByName(name, String(storyId));

  if (Boolean(story)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Task already exist',
        data: undefined,
      },
    };
  }

  const isCreated = await createTask(
    name,
    priority,
    expectedEndTime,
    storyPoint,
    storyId,
    startDate,
    endDate,
    assignedToId,
    description
  );

  if (!isCreated) {
    return {
      status: StatusCode.InternalServer,
      response: {
        error: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.Created,
    response: {
      message: 'Task has been created successfully',
      data: undefined,
    },
  };
}

export async function remove(id: string): Promise<QueryResponse<Task>> {
  if (!id) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Project id is requested',
        data: undefined,
      },
    };
  }

  const story = await getTaskById(id);

  if (!Boolean(story)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Task does not exits',
        data: undefined,
      },
    };
  }

  const isRemoved = await removeTask(id);

  if (!isRemoved) {
    return {
      status: StatusCode.InternalServer,
      response: {
        error: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: {
      message: 'Task has been removed successfully',
      data: undefined,
    },
  };
}

export async function update(
  id: string,
  body: Body
): Promise<QueryResponse<Task>> {
  if (!id) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Task id is requested',
        data: undefined,
      },
    };
  }

  const {
    name,
    priority,
    state,
    expectedEndTime,
    storyPoint,
    startDate,
    endDate,
    assignedToId,
    description,
  } = body;

  const story = await getTaskById(id);

  if (!Boolean(story)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        error: 'Task does not exits',
        data: undefined,
      },
    };
  }

  const isUpdated = await updateTask(
    id,
    name,
    priority,
    state,
    expectedEndTime,
    storyPoint,
    startDate,
    endDate,
    assignedToId,
    description
  );

  if (!isUpdated) {
    return {
      status: StatusCode.InternalServer,
      response: {
        error: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: {
      message: 'Task has been updated successfully',
      data: undefined,
    },
  };
}
