import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { refreshToken } from './handlers/refreshToken';
import { StatusCode } from './types/statusCode';
import { ResponseField } from './types/queryResponse';
import { getTokenError } from './utils/token';
import { signIn } from './handlers/signIn';
import { user } from './handlers/user';
import { project } from './handlers/project';
import { story } from './handlers/story';
import { QueryResponse } from './types/queryResponse';

const app = express();
const port = '3000';
let refreshTokenJwt: string = '';

app.use(cors());
app.use(express.json());

type ApiHandlerFnc = (req: Request, res: Response) => Promise<void>;

interface XX<T, B> {
  getAll?: (parentId?: string) => Promise<QueryResponse<T>>;
  getById?: (id: string) => Promise<QueryResponse<T>>;
  create?: (body: B) => Promise<QueryResponse<T>>;
  remove?: (id: string) => Promise<QueryResponse<T>>;
  update?: (id: string, body: B) => Promise<QueryResponse<T>>;
}

function xx<T, B>(functions: XX<T, B>): ApiHandlerFnc {
  return async (req: Request, res: Response) => {
    const id = req.params?.id;
    const projectId = req.query.projectId as string;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] ?? '';

    if (getTokenError(token).length) {
      const response: ResponseField<undefined> = {
        error: 'Token is not provided',
        data: undefined,
      };

      res.status(StatusCode.BadRequest).send(response);
      return;
    }

    if (functions?.getAll) {
      const { status, response } = await functions.getAll(projectId);
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

// Login user
app.post('/sign-in', async (req: Request, res: Response) => {
  const { status, response } = await signIn(req.body);

  if (response?.refreshToken) {
    refreshTokenJwt = response.refreshToken;
  }

  res.status(status).send(response);
});

// Refresh token
app.post('/refresh-token', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] ?? '';

  if (getTokenError(token).length) {
    const response: ResponseField<undefined> = {
      error: 'Token is not provided',
      data: undefined,
    };

    res.status(StatusCode.BadRequest).send(response);
    return;
  }

  const { status, response } = refreshToken(
    req.body.refreshToken,
    refreshTokenJwt
  );

  if (response?.refreshToken) {
    refreshTokenJwt = response.refreshToken;
  }

  res.status(status).send(response);
});

app.get('/users', xx({ getAll: user.getAll }));

app.get('/projects', xx({ getAll: project.getAll }));
app.get('/projects/:id', xx({ getById: project.getById }));
app.post('/projects', xx({ create: project.create }));
app.put('/projects/:id', xx({ update: project.update }));
app.delete('/projects/:id', xx({ remove: project.remove }));

app.get('/stories', xx({ getAll: story.getAll }));
app.get('/stories/:id', xx({ getById: story.getById }));
app.post('/stories', xx({ create: story.create }));
app.delete('/stories/:id', xx({ remove: story.remove }));
app.put('/stories/:id', xx({ update: story.update }));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
