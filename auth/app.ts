import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { LoggedUser, LoginBody } from './types/login';
import { Response } from './types/response';
import { StatusCode } from './types/statusCode';
import { generateToken } from './utils/token';
import fs from 'fs';
import { User } from './types/user';

interface DbJSON {
  users: Array<User>;
}

let jsonDb: DbJSON;
let allUsers: Array<User>;
let refreshToken: string;

fs.readFile('../db.json', (err, data) => {
  if (err) throw err;
  jsonDb = JSON.parse(String(data));
  allUsers = jsonDb.users;
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/sign-in', (req, res) => {
  const { login, password } = req.body as LoginBody;

  if (!login || !password) {
    const response: Response<LoggedUser> = {
      status: StatusCode.BadRequest,
      message: 'Fields cannot be empty',
      response: undefined,
    };

    res.status(response.status).send(response);
  }

  const user = allUsers.find((u) => u.name === login);

  if (!user) {
    const response: Response<LoggedUser> = {
      status: StatusCode.BadRequest,
      message: 'User cannot be found',
      response: undefined,
    };

    res.status(response.status).send(response);
  }

  refreshToken = generateToken(60 * 60);

  const response: Response<LoggedUser> = {
    status: StatusCode.OK,
    message: 'User logged successfully',
    response: {
      token: generateToken(req.body.exp || 60),
      refreshToken,
      user,
    },
  };

  res.status(response.status).send(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
