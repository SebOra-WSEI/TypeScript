import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { signIn } from './handlers/signIn';

const app = express();
const port = '3000';

app.use(cors());
app.use(express.json());

app.post('/sign-in', async (req: Request, res: Response) => {
  const { status, response } = await signIn(req.body);

  res.status(status).send(response);
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
