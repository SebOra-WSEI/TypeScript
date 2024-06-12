import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { refreshToken } from './handlers/refreshToken';
import { StatusCode } from './types/statusCode';
import { QueryResponse, ResponseField } from './types/queryResponse';
import { getTokenError, isTokenValid } from './utils/token';
import { signIn } from './handlers/signIn';
import { user } from './handlers/user';
import { project } from './handlers/project';

const app = express();
const port = '3000';
let refreshTokenJwt: string = '';

app.use(cors());
app.use(express.json());

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

// Get all users
app.get('/users', async (req: Request, res: Response) => {
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

  const { status, response } = await user.getAll();

  res.status(status).send(response);
});

// Get all projects
app.get('/projects/', async (req: Request, res: Response) => {
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
  const { status, response } = await project.getAll();

  res.status(status).send(response);
});

// Get one project
app.get('/projects/:id', async (req: Request, res: Response) => {
  const id = req.params?.id;
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

  const { status, response } = await project.getById(id);

  res.status(status).send(response);
});

// Create project
app.post('/projects', async (req: Request, res: Response) => {
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
  const { status, response } = await project.create(req.body);

  res.status(status).send(response);
});

// Delete project
app.delete('/projects/:id', async (req: Request, res: Response) => {
  const id = req.params?.id;
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

  const { status, response } = await project.remove(id);

  res.status(status).send(response);
});

// Update project
app.put('/projects/:id', async (req: Request, res: Response) => {
  const id = req.params?.id;
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

  const { status, response } = await project.update(id, req.body);

  res.status(status).send(response);
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
