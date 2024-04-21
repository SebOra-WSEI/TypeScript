import jwt from 'jsonwebtoken';

const tokenSecret = process.env.TOKEN_SECRET as string;

export const generateToken = (expirationInSeconds: number) => {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
  const token = jwt.sign({ exp, foo: 'bar' }, tokenSecret, {
    algorithm: 'HS256',
  });
  return token;
};
