import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import fs from 'fs';
import { User } from './types/user';
import { signInHandler } from './handlers/signInHandler';

export let allUsers: Array<User>;
let refreshToken: string;

fs.readFile('../db.json', (err, data) => {
  if (err) throw err;
  allUsers = JSON.parse(String(data))['users'];
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
