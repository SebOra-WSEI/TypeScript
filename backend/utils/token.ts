import jwt, { JwtPayload } from 'jsonwebtoken';
import { QueryResponse } from '../types/queryResponse';
import { StatusCode } from '../types/statusCode';

const tokenSecret = process.env.TOKEN_SECRET as string;

export const isTokenValid = (token: string): boolean => {
  let isValid = false;

  jwt.verify(token, tokenSecret, function (err, decoded) {
    if (err) {
      console.log('Problem while decoding token:', err.message);
      return;
    }

    const { exp } = (decoded as JwtPayload) ?? {};
    isValid = (exp ?? 0) - new Date().getTime() > 0;
  });

  return isValid;
};

export const generateToken = (expirationInSeconds: number): string => {
  const exp = (Math.floor(Date.now() / 1000) + expirationInSeconds) * 1000;

  const fields: JwtPayload = { exp };

  const token = jwt.sign(fields, tokenSecret, {
    algorithm: 'HS256',
  });
  return token;
};
