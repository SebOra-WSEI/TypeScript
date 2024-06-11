import { createProject } from '../api/createProject';
import { getAllProjects } from '../api/getAllProjects';
import { getProjectByName } from '../api/getProjectByName';
import { Project } from '../types/project';
import { QueryResponse } from '../types/queryResponse';
import { StatusCode } from '../types/statusCode';

interface Body {
  name: string;
  description?: string;
}

interface ProjectCalls {
  getAll: () => Promise<QueryResponse<Array<Project>>>;
  create: (body: Body) => Promise<QueryResponse<Project>>;
}

export const project: ProjectCalls = {
  getAll,
  create,
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

  const data = await getProjectByName(body.name);
  const alreadyExistedProject = data?.[0];

  if (Boolean(alreadyExistedProject)) {
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
