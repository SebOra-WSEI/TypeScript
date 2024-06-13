import { getAllProjects } from '../api/project/getAllProjects';
import { getProjectById } from '../api/project/getProjectById';
import { getProjectByName } from '../api/project/getProjectByName';
import { removeProject } from '../api/project/removeProject';
import { updateProject } from '../api/project/updateProject';
import { createProject } from '../api/project/createProject';
import { Project } from '../types/project';
import { QueryResponse } from '../types/query';
import { StatusCode } from '../types/statusCode';
import { ApiHandler } from '../types/query';

interface Body {
  name: string;
  description?: string;
}

export const project: ApiHandler<Project, Body> = {
  getAll,
  create,
  remove,
  update,
  getById,
};

async function getAll(): Promise<QueryResponse<Array<Project>>> {
  const projects = await getAllProjects();

  if (!projects) {
    return {
      status: StatusCode.InternalServer,
      response: {
        message: 'Internal Server Error',
        data: undefined,
      },
    };
  }

  if (!projects?.length) {
    return {
      status: StatusCode.OK,
      response: {
        message: 'There are no projects',
        data: [],
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: { data: projects },
  };
}

async function getById(id: string): Promise<QueryResponse<Project>> {
  const project = await getProjectById(id);

  if (!Boolean(project)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Project does not exits',
        data: undefined,
      },
    };
  }

  return {
    status: StatusCode.OK,
    response: { data: project },
  };
}

async function create(body: Body): Promise<QueryResponse<Project>> {
  if (!body.name) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Name cannot be empty',
        data: undefined,
      },
    };
  }

  const project = await getProjectByName(body.name);

  if (Boolean(project)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Project already exist',
        data: undefined,
      },
    };
  }

  const isCreated = await createProject(body.name, body.description);

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

async function remove(id: string): Promise<QueryResponse<Project>> {
  if (!id) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Project id is requested',
        data: undefined,
      },
    };
  }

  const project = await getProjectById(id);

  if (!Boolean(project)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Project does not exits',
        data: undefined,
      },
    };
  }

  const isRemoved = await removeProject(id);

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
    status: StatusCode.Created,
    response: {
      message: 'Project has been removed successfully',
      data: undefined,
    },
  };
}

async function update(id: string, body: Body): Promise<QueryResponse<Project>> {
  if (!id) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Project id is requested',
        data: undefined,
      },
    };
  }

  const project = await getProjectById(id);

  if (!Boolean(project)) {
    return {
      status: StatusCode.BadRequest,
      response: {
        message: 'Project does not exits',
        data: undefined,
      },
    };
  }

  const isUpdated = await updateProject(id, body.name, body.description);

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
      message: 'Project has been updated successfully',
      data: undefined,
    },
  };
}
