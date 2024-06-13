import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { refreshToken } from './handlers/refreshToken';
import { StatusCode } from './types/statusCode';
import { ResponseField } from './types/query';
import { getTokenError } from './utils/token';
import { signIn } from './handlers/signIn';
import { user } from './handlers/user';
import { project } from './handlers/project';
import { story } from './handlers/story';
import { createHandlerFunction } from './utils/createHandlerFunction';

const app = express();
const port = '3000';
let refreshTokenJwt: string = '';

app.use(cors());
app.use(express.json());

app.post('/sign-in', async (req: Request, res: Response) => {
  const { status, response } = await signIn(req.body);

  if (response?.refreshToken) {
    refreshTokenJwt = response.refreshToken;
  }

  res.status(status).send(response);
});

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

app.get('/users', createHandlerFunction({ getAll: user.getAll }));

app.get('/projects', createHandlerFunction({ getAll: project.getAll }));
app.get('/projects/:id', createHandlerFunction({ getById: project.getById }));
app.post('/projects', createHandlerFunction({ create: project.create }));
app.put('/projects/:id', createHandlerFunction({ update: project.update }));
app.delete('/projects/:id', createHandlerFunction({ remove: project.remove }));

app.get('/stories', createHandlerFunction({ getAll: story.getAll }));
app.get('/stories/:id', createHandlerFunction({ getById: story.getById }));
app.post('/stories', createHandlerFunction({ create: story.create }));
app.delete('/stories/:id', createHandlerFunction({ remove: story.remove }));
app.put('/stories/:id', createHandlerFunction({ update: story.update }));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
