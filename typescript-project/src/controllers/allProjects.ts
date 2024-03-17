import { ProjectModel } from '../types/project';
import { Response } from '../types/response';
import { StatusCode } from '../types/statusCode';
import { getAllProjectsFromLocalStorage } from '../utils/getProjectsFromLocalStorage';

export class AllProjects {
  get(): Response<Array<ProjectModel>> {
    return {
      status: StatusCode.OK,
      response: getAllProjectsFromLocalStorage(),
    };
  }
}
