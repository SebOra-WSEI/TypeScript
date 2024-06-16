import { Request, Response } from 'express';
import { QueryResponse, ResponseField } from '../types/query';
import { StatusCode } from '../types/statusCode';
import { getTokenError } from './token';

interface HandlerFunction<T, B> {
  getAll?: (parentId?: string) => Promise<QueryResponse<T>>;
  getById?: (id: string) => Promise<QueryResponse<T>>;
  create?: (body: B) => Promise<QueryResponse<T>>;
  remove?: (id: string) => Promise<QueryResponse<T>>;
  update?: (id: string, body: B) => Promise<QueryResponse<T>>;
}

export function createHandlerFunction<T, B>(
  functions: HandlerFunction<T, B>
): (req: Request, res: Response) => Promise<void> {
  return async (req: Request, res: Response) => {
    const id = req.params?.id;
    const projectId = req.query.projectId as string;
    const storyId = req.query.storyId as string;

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] ?? '';

    const errMsg = getTokenError(token);

    if (errMsg.length) {
      const response: ResponseField<undefined> = {
        error: errMsg,
        data: undefined,
      };

      res.status(StatusCode.BadRequest).send(response);
      return;
    }

    if (functions?.getAll) {
      const { status, response } = await functions.getAll(projectId || storyId);
      res.status(status).send(response);
      return;
    }

    if (functions?.getById) {
      const { status, response } = await functions.getById(id);
      res.status(status).send(response);
      return;
    }

    if (functions?.create) {
      const { status, response } = await functions.create(req.body);
      res.status(status).send(response);
      return;
    }

    if (functions?.remove) {
      const { status, response } = await functions.remove(id);
      res.status(status).send(response);
      return;
    }

    if (functions?.update) {
      const { status, response } = await functions.update(id, req.body);
      res.status(status).send(response);
      return;
    }
  };
}
