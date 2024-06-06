import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { signIn } from './handlers/signIn';
import { refreshToken } from './handlers/refreshToken';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCode } from './types/statusCode';
import { ResponseField } from './types/queryResponse';
import { isTokenValid } from './utils/token';

const app = express();
const port = '3000';
let refreshTokenJwt: string = '';

app.use(cors());
app.use(express.json());

const tokenSecret = process.env.TOKEN_SECRET as string;

// User
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

  if (!token.length) {
    const response: ResponseField<undefined> = {
      error: 'Token is not provided',
      data: undefined,
    };

    res.status(StatusCode.BadRequest).send(response);
    return;
  }

  if (!isTokenValid(token)) {
    const response: ResponseField<undefined> = {
      error: 'Invalid tokenFormat',
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

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
