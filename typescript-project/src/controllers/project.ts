import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from '../types/statusCode';
import { Response } from '../types/response';
import { ProjectModel } from '../types/project';
import { LOCAL_STORAGE_KEY } from '../utils/consts';
import { AllProjects } from './allProjects';

export class Project {
  readonly name: string;
  description?: string;

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }

  get(): Response<ProjectModel> {
    const allProjects = new AllProjects().get().response;
    const project = allProjects?.find((p) => p.name === this.name);

    if (!project) {
      return {
        status: StatusCode.BadRequest,
        message: `Project "${this.name}" not found`,
        response: undefined,
      };
    }

    return {
      status: StatusCode.OK,
      response: project,
    };
  }

  create(): Response<ProjectModel> {
    const newProject: ProjectModel = {
      id: uuidv4(),
      name: this.name,
      description: this.description,
    };

    const allProjects = new AllProjects().get().response;

    if (allProjects?.find((p) => p.name === this.name)) {
      return {
        status: StatusCode.BadRequest,
        message: `Project "${this.name}" already exist`,
        response: undefined,
      };
    }

    allProjects?.push(newProject);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allProjects));

    return {
      status: StatusCode.Created,
      message: 'Project has been created successfully',
      response: newProject,
    };
  }
}
