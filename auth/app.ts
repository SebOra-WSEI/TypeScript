import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import fs from 'fs';
import { User } from './types/user';
import { signInHandler } from './handlers/signInHandler';

interface DbJSON {
  users: Array<User>;
}

export let allUsers: Array<User>;
let jsonDb: DbJSON;
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
  const response = signInHandler(req.body);

  refreshToken = response.response?.refreshToken ?? '';

  res.status(response.status).send(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
