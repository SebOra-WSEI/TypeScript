import jwt from 'jsonwebtoken';

const tokenSecret = process.env.TOKEN_SECRET as string;

export const generateToken = (expirationInSeconds: number): string => {
  const exp = (Math.floor(Date.now() / 1000) + expirationInSeconds) * 1000;
  const token = jwt.sign({ exp }, tokenSecret, {
    algorithm: 'HS256',
  });
  return token;
};
