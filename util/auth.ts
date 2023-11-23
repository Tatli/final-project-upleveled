import jwt from 'jsonwebtoken';
import { User, UserJwtPayload } from './types';

export const getJwtSecretKey = () => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey || secretKey.length === 0) {
    throw new Error('JWT_SECRET is not set');
  }
  return secretKey;
};

export const checkLogin = async (token: string) => {
  try {
    const verified = await jwt.verify(token, getJwtSecretKey());
    return verified as UserJwtPayload;
  } catch (err) {
    console.error(err);
  }
};

export const createSessionToken = async (user: User) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const options = {
    expiresIn: '1h',
  };
  const sessionToken = jwt.sign(payload, process.env.JWT_SECRET!, options);
  return sessionToken;
};
